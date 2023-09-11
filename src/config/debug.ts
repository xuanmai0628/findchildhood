import { getQuery } from "../utils/utils";

let skipLoading = false;

if (getQuery('debug') === '1') {
    skipLoading = true;
}

// 跳过加载动画
export { skipLoading };