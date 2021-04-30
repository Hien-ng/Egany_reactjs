import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import ProductItem from './ProductItem';

ProductList.propTypes = {
    data: PropTypes.array.isRequired,
};

function ProductList({ data }) {
    return (
        <Box padding={1}>
            <Grid container >
                {data.map(element => (
                    <Grid item key={element.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductItem product={element} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;