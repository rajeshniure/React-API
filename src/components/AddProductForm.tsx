import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TextField, Button, Stack, Snackbar, Paper, Typography } from '@mui/material';
import { addProduct } from '../api/API';
import { useNavigate } from 'react-router-dom';


export const AddProductForm = () => {
    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      setOpen(true);
      setFormData({ title: '', description: '', price: '', image: '' });
      
      setTimeout(() => {
        navigate('/products'); 
      }, 1500); 
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      price: parseFloat(formData.price),
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
            <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
            slotProps={{
              input: {
                inputProps: {
                  step: 0.01,
                  min: 0
                }
              }
            }}
            />
          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" size="large">
            Add Product
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Product added successfully!"
      />
    </Paper>
  );
};
