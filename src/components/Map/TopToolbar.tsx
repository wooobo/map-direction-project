import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import Input from "../Input";
import SearchDropbox from "./SearchDropbox";
import usePlaceAutoComplete from "../../hooks/useSearchPlaceAutoComplete";
import { useDebounce } from "use-debounce";
import useOnClickOutside from "use-onclickoutside";

export type TopToolbarProps = {
  children: React.ReactNode;
};

export default function TopToolbar({ children }: TopToolbarProps) {
  return <div>{children}</div>;
}

function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(keyword, 400);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { results, goUp, goDown, selectedIndex, reset } = usePlaceAutoComplete(
    debouncedKeyword
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onFocus = () => setOpen(true);
  const onBlur = () => setOpen(false);
  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) return;
    e.preventDefault();
    if (e.key === "ArrowDown") {
      goDown();
    } else if (e.key === "ArrowUp") {
      goUp();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "" && !open) {
      setOpen(true);
    }
    setKeyword(e.target.value);
  };

  return (
    <div css={topToolbarStyle}>
      <Input
        placeholder="장소 검색을 할 수 있습니다."
        onFocus={onFocus}
        onBlur={(e) => {
          e.persist();
          const relatedTarget = e.relatedTarget as HTMLElement | null;
          if (relatedTarget && relatedTarget.dataset.type === "place-item") {
            return;
          }
          onBlur();
        }}
        value={keyword}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
        css={searchInputStyle}
      />
      <SearchDropbox
        visible={open}
        onClose={onClose}
        results={results}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

TopToolbar.SearchInput = SearchInput;

const topToolbarStyle = css`
  display: flex;
  width: 100%;
`;

const searchInputStyle = css`
  flex-basis: 80%;
  border: 0;
`;
