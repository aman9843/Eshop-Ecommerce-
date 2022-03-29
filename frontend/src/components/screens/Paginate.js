import React from "react";
import { Pagination, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({isAdmin = false, keyword = "",page,pages }) => {


  return (
     pages > 1 && (
    <Pagination>
      {[...Object(pages).key()].map((x) => (
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
