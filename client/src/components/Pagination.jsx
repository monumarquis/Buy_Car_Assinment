import { Text } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({ page, totalPages, handlePagination }) => {
    let arr = new Array(totalPages).fill(null)
    // console.log("page", page);
    return (
        <nav class="pagination-outer" aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item">
                    <button class="page-link" aria-label="Previous" disabled={page === 1} onClick={() => handlePagination(page - 1)}>
                        <span aria-hidden="true">«</span>
                    </button>
                </li>
                {arr.map((el, i) => {
                    return (<li key={i} class={`page-item ${page === i + 1 ? "active" : ""}`} onClick={() => handlePagination(i + 1)} ><Text class="page-link">{i + 1}</Text></li>)
                })
                }
                <li class="page-item"  >
                    <button onClick={() => handlePagination(page + 1)} disabled={page === totalPages} class="page-link" aria-label="Next">
                        <span aria-hidden="true">»</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination