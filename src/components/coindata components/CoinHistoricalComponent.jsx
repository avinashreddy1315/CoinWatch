import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { UseSingleCoin } from '../../cutom components and hooks/SingleCoinContext';
import { useCoin } from '../../cutom components and hooks/CoinContext';
import { styled } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { format, parseISO, differenceInMonths, differenceInYears } from 'date-fns';

const StyledTableCell1 = styled(TableCell)(({ theme }) => ({
    fontWeight: 900,
    color: 'rgb(100 116 139)',
    borderBottom: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
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
    overflow: 'hidden'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderBottom: '1px solid #f0f2f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

function CoinHistoricalComponent() {
    const { coinData } = UseSingleCoin();
    const { currency } = useCoin();

    const ath = coinData?.market_data?.ath?.[currency.value];
    const ath_percentage = coinData?.market_data?.ath_change_percentage?.[currency.value];
    const ath_date = coinData?.market_data?.ath_date?.[currency.value];

    const atl = coinData?.market_data?.atl?.[currency.value];
    const atl_percentage = coinData?.market_data?.atl_change_percentage?.[currency.value];
    const atl_date = coinData?.market_data?.atl_date?.[currency.value];

    const high_24h = coinData?.market_data?.high_24h?.[currency.value];
    const low_24h = coinData?.market_data?.low_24h?.[currency.value];

    const formatPercentage = (percentage) => {
        if (percentage === undefined || percentage === null) {
            return 'Loading...';
        }
        const formattedPercentage = Math.abs(percentage).toFixed(2);
        const isNegative = percentage < 0;
        const color = isNegative ? 'rgb(255, 58, 51)' : 'rgb(0, 168, 62)';
        const icon = isNegative ? <ArrowDropDownIcon style={{ color }} /> : <ArrowDropUpIcon style={{ color }} />;
        return (
            <span style={{ color }}>
                {icon} {formattedPercentage}%
            </span>
        );
    };

    const formatDateWithDifference = (isoDate) => {
        if (!isoDate) return 'N/A'; // Handle undefined or null isoDate
        const date = parseISO(isoDate);
        const formattedDate = format(date, 'MMM d, yyyy');
        const now = new Date();
        const monthsDifference = differenceInMonths(now, date);
        const yearsDifference = differenceInYears(now, date);

        const differenceText = yearsDifference >= 1 
            ? `(about ${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'})` 
            : `(${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'})`;

        return `${formattedDate} ${differenceText}`;
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell1 sx={{ py: 1 }}>24h Range</StyledTableCell1>
                            <StyledTableCell2 sx={{ py: 1 }}>
                                {high_24h && low_24h ? `${currency.symbol}${high_24h.toLocaleString()} - ${currency.symbol}${low_24h.toLocaleString()}` : 'null'}
                            </StyledTableCell2>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell1 sx={{ py: 1 }}>All-Time High</StyledTableCell1>
                            <StyledTableCell2 sx={{ py: 1 }}>
                                <div className='at'>{ath ? (<span>{`${currency.symbol}${ath.toLocaleString()} `}{formatPercentage(ath_percentage)}</span>) : 'null'}</div>
                                <div className='da'>{formatDateWithDifference(ath_date)}</div>
                            </StyledTableCell2>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell1 sx={{ py: 1 }}>All-Time Low</StyledTableCell1>
                            <StyledTableCell2 sx={{ py: 1 }}>
                                <div className='at'>{atl ? (<span>{`${currency.symbol}${atl.toLocaleString()} `}{formatPercentage(atl_percentage)}</span>) : 'null'}</div>
                                <div className='da'>{formatDateWithDifference(atl_date)}</div>
                            </StyledTableCell2>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CoinHistoricalComponent;
