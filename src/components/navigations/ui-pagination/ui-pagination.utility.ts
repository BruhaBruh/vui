export function calculatePages({
  page,
  pageAmount,
  pagesToView,
}: {
  page: number;
  pageAmount: number;
  pagesToView: number;
}) {
  let leftCount: number, rightCount: number;

  if (pagesToView % 2 === 0) {
    leftCount = pagesToView / 2;
    rightCount = pagesToView / 2 - 1;
  } else {
    leftCount = rightCount = Math.floor(pagesToView / 2);
  }

  let start = page - leftCount;
  let end = page + rightCount;

  if (start < 1) {
    const diff = 1 - start;
    end = Math.min(end + diff, pageAmount);
    start = 1;
  }

  if (end > pageAmount) {
    const diff = end - pageAmount;
    start = Math.max(start - diff, 1);
    end = pageAmount;
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}
