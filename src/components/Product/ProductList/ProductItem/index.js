import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
};

function ProductItem({ product }) {
    const thumbnailURL = product.image ? product.image.src : 'https://via.placeholder.com/444'

    return (
        <Box padding={1}>
            <Box padding={2} minHeight='200px' style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={thumbnailURL}
                    alt=''
                    width='100%'
                />
            </Box>
            <Typography variant='body2'>{product.title}</Typography>
            <Typography variant='body2' style={{ textDecoration: 'line-through', color: 'green' }}>
                {formatPrice(product?.variants[0].compare_at_price)}
            </Typography>
            <Typography variant='body2'>
                <Box component='span' fontSize='16px' fontWeight='bold' mr={1}>
                    {formatPrice(product?.variants[0].price)}
                </Box>
                {product?.variants[0].compare_at_price > 0 ? ` - ${(product?.variants[0].price * 100 / product?.variants[0].compare_at_price).toFixed(2)}%` : ''}
            </Typography>
            <Typography variant='body2'>{product?.variants[0].inventory_quantity <= 0 ? 'hết' : product?.variants[0].inventory_quantity} sản phẩm</Typography>
        </Box>
    );
}

export default ProductItem;