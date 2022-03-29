import React from "react";
import { Pagination, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ isAdmin = false, keyword = "", page, pages }) => {
 

  return (
    <div className="paginate">
    {
        pages > 1 && (
      
          <Pagination>
            {[...Array(pages).keys()].map((x) => {
              
              return (
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
                  <Button  variant="outline-dark" className="rounded-circle  pb">
                    {x + 1}
                  </Button>
                </Link>
              );
            })}
          </Pagination>
        )
    }
    
  

    </div>  
  );
  
  
};

export default Paginate;
