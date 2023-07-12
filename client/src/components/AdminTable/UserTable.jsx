/* eslint-disable no-unused-vars */
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getAllUsers,userHandle } from "../../api/AdminRequest/AdminRequest";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { Button, CircularProgress, Skeleton } from "@mui/material";

// const UserTable = () => {
//   const token = useSelector((state) => state.adminToken);
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(4);
//   const [loading, setLoading] = useState(true);
//   const [filterReported, setFilterReported] = useState(false);
//   const [searchValue,setSearchValue]=useState('')

//   const filteredUsers = users.filter((user) => {
//     if (searchValue === "") {
//       return true;
//     } else if (
//       user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchValue.toLowerCase())
//     ) {
//       return true;
//     }
//     return false;
//   });
 
//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const response = await getAllUsers(token);
//         console.log(response)
//         setUsers(response);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     getUsers();
//   }, [token]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };



      
//   const handleUser = async (userId) => {
//     const user = await userHandle(userId, token);
//     const updatedUsers = users.map((user) => {
//       if (user._id === userId) {
//         return { ...user, isBlocked: !user.isBlocked };
//       }
//       return user;
//     });
//     setUsers(updatedUsers);
//   };
//   return (
//     <div>
//       <Typography variant='h6' component='div' sx={{ mb: 2 }}>
//         User Table
//       </Typography>
      
//       {loading ? (
//         <>
//           <Skeleton height={"80vh"} animation='wave' />
//         </>
//       ) : (
//         <>
//         <input type="text" placeholder="Search..."/>
//         <div></div>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label='user table'>
//               <TableHead>
//                 <TableRow>
                  
//                   <TableCell>Name</TableCell>
//                   <TableCell>Username</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Number</TableCell>
                 
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredUsers.map((user) => (
//                   <TableRow key={user._id}>
                    
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.userName}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.number}</TableCell>
                    
               
                    
                    
//                     <TableCell>
//                       {user.isBlocked ? (
//                         <Button
//                           variant='outlined'
//                           color='primary'
//                           onClick={() => handleUser(user._id)}
                         
//                         >
//                           Reactivate
//                         </Button>
//                       ) : (
//                         <Button
//                           variant='outlined'
//                           color='secondary'
//                           onClick={() => handleUser(user._id)}

                         
//                         >
//                           Deactivate
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//         </>
//       )}
//     </div>
//   );
// };

// export default UserTable;




import {

 
 
 



 

  TextField,
  Grid,
  Box,
  
} from "@mui/material";


const UserTable = () => {
  const token = useSelector((state) => state.adminToken);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [filterReported, setFilterReported] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredUsers = users.filter((user) => {
    if (searchValue === "") {
      return true;
    } else if (
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllUsers(token);
        console.log(response);
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleUser = async (userId) => {
    const user = await userHandle(userId, token);
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, isBlocked: !user.isBlocked };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        User Table
      </Typography>

      {loading ? (
        <Skeleton height={"80vh"} animation="wave" />
      ) : (
        <>
          <TextField
            type="text"
            placeholder="Search..."
            variant="outlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.number}</TableCell>
                    <TableCell>
                      {user.isBlocked ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleUser(user._id)}
                        >
                          Reactivate
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleUser(user._id)}
                        >
                          Deactivate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default UserTable;
