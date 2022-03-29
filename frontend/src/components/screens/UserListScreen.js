import React from "react";
import { useEffect } from "react";
import { useHistory,Link} from "react-router-dom";
import { Button,Table,Container} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { userList } from "../../actions/userActions";
import { userDelete } from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";

const UserListScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList;
  console.log(usersList);

  const usersDelete = useSelector((state) => state.usersDelete);
  const { success: successDelete } = usersDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userList());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(userDelete(id));
    }
  };

  return (
    <>
      <h1>Users List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

               
                <td>
                

                  {user.isAdmin ? (<Container as={Link} to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas  fa-eye"></i>
                    </Button>
                  </Container> ): ( <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>)}
                 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
