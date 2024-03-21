import { useState, useCallback } from "react";
import NProgress from "nprogress";

const useLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  const startLoading = useCallback(() => {
    NProgress.start();
    setIsPageLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    NProgress.done();
    setIsPageLoading(false);
  }, []);

  return { isPageLoading, startLoading, stopLoading };
};

export default useLoading;
