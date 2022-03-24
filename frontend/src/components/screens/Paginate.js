import React from "react";
import { Pagination, Container} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Paginate = ({isAdmin = false, keyword = "" }) => {

    const productList = useSelector((state) => state.productList);
    const { page,pages } = productList;
    console.log(page)
    console.log(pages)
  return (
     pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <Link
          as={Container}
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </Link>
      ))}
    </Pagination>
 
  ))}

export default Paginate;
