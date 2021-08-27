import { locUrl, bdlinkPattern } from "@/common/const";

/**
 * @description: 从url中解析秒传链接
 */
export default function initQueryLink(): string {
  let bdlinkB64 = locUrl.match(bdlinkPattern);
  return bdlinkB64 ? bdlinkB64[1].fromBase64() : "";
}
