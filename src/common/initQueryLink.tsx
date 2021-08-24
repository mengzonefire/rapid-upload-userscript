import { locUrl, bdlinkPattern } from "@/common/const";

export default function initQueryLink(): void {
  let bdlink = locUrl.match(bdlinkPattern);
  if (bdlink) {
    bdlink = bdlink[1].fromBase64();
  }
}
