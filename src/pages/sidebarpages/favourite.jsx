import React, { useState, useEffect } from 'react';
import AnimatedPage from '../../components/pageAnimations/AnimatedPage';
import { useSidebar } from '../../cutom components and hooks/SidebarContext';
import { useUser } from '../../cutom components and hooks/userprovider';
import '../../css/favouritePage.css';
import { Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material';
import { useCoin } from '../../cutom components and hooks/CoinContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UseSingleCoin } from '../../cutom components and hooks/SingleCoinContext';
import { styled } from '@mui/system';

const StyledTableCell1 = styled(TableCell)(({ theme }) => ({
  fontWeight: 900,
  color: 'rgb(100 116 139)',
  borderBottom: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}));

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bolder',
  color: 'rgb(15 23 42)',
  borderBottom: 'none',
  fontSize: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: '1px solid #f0f2f5',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
  opacity: 1,
  cursor: 'pointer',
}));

const moveLeft = {
  transform: 'translateX(-130px)',
};

const fadeOut = {
  opacity: 0,
};

const Favourite = ({ uid }) => {
  const { sidebar, setSidebar } = useSidebar();
  const { data, setData } = useUser();
  const { allCoin, loading, currency } = useCoin();
  const [deletedRow, setDeletedRow] = useState(null);
  const [confirmRow, setConfirmRow] = useState(null);
  const [favourite, setFavourite] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const { setCoinId } = UseSingleCoin();
  const navigate = useNavigate();

  useEffect(() => {
    if (sidebar) {
      setSidebar(!sidebar);
    }
    if (data?.favourite) {
      setFavourite(data.favourite);
    }
  }, [data]);

  const searchPrice = (id) => {
    const coin = allCoin.find((coi) => coi.id === id);
    return coin ? coin.current_price : 'Price not available';
  };

  const searchName = (id) => {
    const coin = allCoin.find((coi) => coi.id === id);
    return coin ? coin.name : 'Name not available';
  };

  const handleDeleteClick = (fav, event) => {
    event.stopPropagation(); // Stop event propagation
    setDeletedRow(fav);
    setConfirmRow(fav);
  };

  const clearDeleteClick = (event) => {
    event.stopPropagation(); // Stop event propagation
    setDeletedRow(null);
    setConfirmRow(null);
  };

  const handleConfirmDelete = async (fav, event) => {
    event.stopPropagation(); // Stop event propagation
    setIsDeleting(true);
    const db = getFirestore();
    const userDocRef = doc(db, 'users', data.uid); // Replace 'users' with your Firestore collection and data.uid with the user ID
    const updatedFav = favourite.filter((favId) => favId !== fav);
    await updateDoc(userDocRef, {
      favourite: updatedFav,
    });

    // Refetch the user document to get the updated favourite array
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const updatedData = userDocSnap.data();
      setData(updatedData);
      setFavourite(updatedData.favourite);
    }

    setIsDeleting(false);
    setConfirmRow(null);
    setDeletedRow(null);
  };

  const coinDetails = (fav) => {
    setCoinId(fav);
    navigate(`/wallet/${fav}`);
  };

  return (
    <AnimatedPage>
      <div className="fav_page">
        <h4>Favourite Coins</h4>
        <TableContainer>
          <Table>
            <TableBody>
              {favourite.length === 0 ? (
                <p className="no_fav_coins">No coins in Favourite List</p>
              ) : (
                favourite.map((fav) => (
                  <StyledTableRow
                    key={fav}
                    style={{
                      ...(deletedRow === fav ? moveLeft : {}),
                      ...(confirmRow === fav && isDeleting ? fadeOut : {}),
                    }}
                    onClick={() => coinDetails(fav)}
                  >
                    <StyledTableCell1>{searchName(fav)}</StyledTableCell1>
                    <StyledTableCell2>
                      {currency.symbol}
                      {searchPrice(fav).toLocaleString()}
                    </StyledTableCell2>
                    {deletedRow === fav ? (
                      <>
                        <TableCell>
                          <button
                            className="fav_remove_btn"
                            onClick={(event) => clearDeleteClick(event)}
                          >
                            <ClearIcon />
                          </button>
                        </TableCell>
                        {confirmRow === fav && (
                          <TableCell>
                            <Button
                              style={{
                                position: 'absolute',
                                top: '15px',
                                right: confirmRow === fav ? '-120px' : '0px',
                                transition: 'right 0.3s ease-in-out',
                              }}
                              variant="contained"
                              color="secondary"
                              onClick={(event) => handleConfirmDelete(fav, event)}
                            >
                              Confirm Delete
                            </Button>
                          </TableCell>
                        )}
                      </>
                    ) : (
                      <TableCell>
                        <button
                          className="fav_remove_btn"
                          onClick={(event) => handleDeleteClick(fav, event)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </TableCell>
                    )}
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </AnimatedPage>
  );
};

export default Favourite;
