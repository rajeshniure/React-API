import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/API';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Box,
  Button,
} from '@mui/material';

export const ProductList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box mt={4}>
        <Alert severity="error">{(error as Error).message}</Alert>
      </Box>
    );

  return (
    <>
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Button variant="contained" color="primary" href="/add-product">
        Add New Product
      </Button>
    </Box>
    <Grid container spacing={4} mt={2}>
      {data.map((product: any) => (
        <Grid size={{xs: 12, md: 4, lg: 2}} key={product.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              transition: 'transform 0.3s ease',
              boxShadow: 4,
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                height: 150,
                objectFit: 'contain',
                p: 2,
                backgroundColor: '#f9f9f9',
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom noWrap>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {product.description?.slice(0, 60)}...
              </Typography>
              <Typography variant="h6" color="primary">
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};
