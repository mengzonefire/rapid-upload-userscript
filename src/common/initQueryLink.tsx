import { locUrl, bdlinkPattern } from "@/common/const";

/**
 * @description: 从url中解析秒传链接
 */
export default function initQueryLink(): string {
  let bdlink = "";
  let bdlinkB64 = locUrl.match(bdlinkPattern);
  if (bdlinkB64) {
    bdlink = bdlinkB64[1].fromBase64();
  }
  return bdlink;
}
