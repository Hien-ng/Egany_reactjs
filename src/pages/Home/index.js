import { Box, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import productApi from 'api/productApi';
import { Loading, ProductList } from 'components';
import { useEffect, useRef, useState } from 'react';

const useStyle = makeStyles(theme => ({
    root: {},
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        padding: '20px 0'
    },
}))

const Home = () => {
    const classes = useStyle()
    const [products, setProducts] = useState({
        status: 'loading',
        data: [],
        error: null
    });

    const typingTimeoutRef = useRef(null)

    const [filters, setFilters] = useState({ search: null })

    const { status, data } = products

    useEffect(() => {
        setProducts({ status: 'loading', data: [] });
        (async () => {
            try {
                const respond = await productApi.getAll(filters)
                setProducts({ data: respond.products, status: 'resolved' })
            } catch (error) {
                setProducts({ error: error, status: 'rejected' })
                console.log('Failed to fetch product list: ', error);
            }
        })()
    }, [filters]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = event.target.value

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            if (value === '') {
                setFilters(preFilter => ({
                    ...preFilter,
                    search: null
                }))
            }
            setFilters(preFilter => ({
                ...preFilter,
                search: value
            }))
        }, 1000);
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0} >
                            <Box padding={1}>
                                <Typography variant='body2'>Tìm kiếm sản phẩm</Typography>
                                <form onChange={handleSubmit}>
                                    <TextField id="outlined-basic" variant="outlined" />
                                </form>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            {status === 'loading' && <Loading />}
                            {status === 'resolved' && <ProductList data={data} />}
                            {(data.length === 0 && status === 'resolved') && <Typography variant='body2'>không tìm thấy sản phẩm</Typography>}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;