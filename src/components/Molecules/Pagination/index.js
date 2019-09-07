import React from "react";

export default function Pagination({
  getFirst,
  getPrevious,
  getNext,
  getLast,
  goToPage,
  activePage,
  setActivePage,
  total
}) {
  function getRange(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  const pageNumbers = getRange(
    activePage >= 4 ? activePage - 4 : activePage,
    activePage <= total - 4 ? activePage + 4 : activePage
  ).map(number => (
    <li key={number} onClick={() => goToPage(number)}>
      <a
        href="/"
        className={`${number === activePage ? "active-page" : ""} item-pages`}
        onClick={e => {
          e.preventDefault();
          goToPage(number);
        }}
      >
        {number}
      </a>
    </li>
  ));

  return (
    total > 1 && (
      <ul class="pagination">
        <li class={`waves-effect ${activePage === 1 ? "disabled" : ""}`}>
          <a href="#!" onClick={() => getFirst()}>
            <i class="material-icons">first_page</i>
          </a>
        </li>
        <li class={`waves-effect ${activePage === 1 ? "disabled" : ""}`}>
          <a href="#!" onClick={() => getPrevious()}>
            <i class="material-icons">chevron_left</i>
          </a>
        </li>
        {Array(total)
          .fill()
          .map((page, index) => (
            <li className={activePage === index + 1 ? "active" : ""}>
              <a href="#" onClick={() => setActivePage(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
        <li class={`waves-effect ${activePage >= total ? "disabled" : ""}`}>
          <a href="#!" onClick={() => getNext()}>
            <i class="material-icons">chevron_right</i>
          </a>
        </li>
        <li class={`waves-effect ${activePage >= total ? "disabled" : ""}`}>
          <a href="#!" onClick={() => getLast()}>
            <i class="material-icons">last_page</i>
          </a>
        </li>
      </ul>
    )
  );
}
