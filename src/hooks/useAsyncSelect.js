import debounce from "lodash/debounce";
import { useCallback } from "react";

const useAsyncSelect = (asyncCallback, delay = 500) => {
  // eslint-disable-next-line
  const debouncedFn = useCallback(debounce(asyncCallback, delay), []);

  const loadOptions = inputValue =>
    new Promise(resolve => {
      debouncedFn(inputValue, resolve);
    });

  return { debouncedFn, loadOptions };
};

export default useAsyncSelect;
