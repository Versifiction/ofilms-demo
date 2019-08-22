import React from "react"

export default function Pagination({
  getFirst,
  getPrevious,
  getNext,
  getLast,
  goToPage,
  activePage,
  total
}) {

  function getRange(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx)
  }

  const pageNumbers = getRange(activePage >= 4 ? activePage - 4 : activePage, activePage <= total - 4 ? activePage + 4 : activePage).map(number => (
    <li key={number} onClick={() => goToPage(number)}>
      <a
        href="/"
        className={`${number === activePage ? "active-page" : ""} item-pages`}
        onClick={e => {
          e.preventDefault()
          goToPage(number)
        }}>
        {number}
      </a>
    </li>
  ))

  return (
    total > 1 && (
        <div className="row">
            <div className="col-xs-12" style={{ margin: "0 auto" }}>
                <nav
                    aria-label="Page navigation"
                    className="pagination-nav"
                    style={{ textAlign: "right", height: "inherit" }}>
                    <ul className="pagination">
                        <li onClick={getFirst}>
                        <a
                            href="/"
                            aria-label="First"
                            onClick={e => e.preventDefault()}
                            className={activePage === 1 ? "disabled" : ""}
                            disabled={activePage === 1 ? "true" : "false"}
                            style={{
                              cursor: activePage === 1 ? "not-allowed" : "pointer"
                            }}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li onClick={getPrevious}>
                        <a
                            href="/"
                            aria-label="Previous"
                            onClick={e => e.preventDefault()}
                            className={activePage === 1 ? "disabled" : ""}
                            disabled={activePage === 1 ? "true" : "false"}
                            style={{
                            cursor: activePage === 1 ? "not-allowed" : "pointer"
                            }}>
                            <span aria-hidden="true">&lt;</span>
                        </a>
                        </li>
                        {activePage >= 6 ? (
                          <>
                          <li onClick={() => goToPage(1)}>
                            <a
                              href="/"
                              className={`${1 === activePage ? "active-page" : ""} item-pages`}
                              onClick={e => {
                                e.preventDefault()
                                goToPage(1)
                              }}>
                              {1}
                            </a>
                          </li>
                          ...&nbsp;
                          </>
                        ) : ""}
                        {pageNumbers}
                        {activePage <= total - 3 ? (
                          <>
                          ...&nbsp;
                          <li onClick={() => goToPage(total)}>
                            <a
                              href="/"
                              className={`${total === activePage ? "active-page" : ""} item-pages`}
                              onClick={e => {
                                e.preventDefault()
                                goToPage(total)
                              }}>
                              {total}
                            </a>
                          </li>
                          </>
                        ) : ""}
                        <li onClick={getNext}>
                            <a
                                href="/"
                                aria-label="Next"
                                onClick={e => e.preventDefault()}
                                disabled={activePage >= total ? "true" : "false"}
                                style={{
                                  cursor: activePage >= total ? "not-allowed" : "pointer"
                                }}>
                                <span aria-hidden="true">&gt;</span>
                            </a>
                        </li>
                        <li onClick={getLast}>
                            <a
                                href="/"
                                aria-label="Last"
                                onClick={e => e.preventDefault()}
                                disabled={activePage >= total ? "true" : "false"}
                                style={{
                                  cursor: activePage >= total ? "not-allowed" : "pointer"
                                }}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
  )
}