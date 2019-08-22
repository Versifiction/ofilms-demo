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

  const pageNumbers = getRange(1, 10).map(number => (
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
            <div className="col-xs-12">
                <nav
                    aria-label="Page navigation"
                    className="pagination-nav"
                    style={{ textAlign: "right", marginBottom: "20px" }}>
                    <ul className="pagination">
                        <li onClick={getFirst}>
                        <a
                            href="/"
                            aria-label="First"
                            onClick={e => e.preventDefault()}
                            className={activePage === 1 ? "disabled" : ""}
                            disabled={activePage === 1 ? "true" : "false"}
                            style={{
                            pointerEvents: activePage === 1 ? "none" : "initial"
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
                            pointerEvents: activePage === 1 ? "none" : "initial"
                            }}>
                            <span aria-hidden="true">&lt;</span>
                        </a>
                        </li>
                        {pageNumbers}
                        <li onClick={getNext}>
                            <a
                                href="/"
                                aria-label="Next"
                                onClick={e => e.preventDefault()}
                                disabled={activePage >= total ? "true" : "false"}
                                style={{
                                pointerEvents: activePage >= total ? "none" : "initial"
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
                                pointerEvents: activePage >= total ? "none" : "initial"
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