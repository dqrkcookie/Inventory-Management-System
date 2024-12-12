export const inputValidators = {
  notEmpty: {
    errorMessage: 'Cannot be empty',
  },
  name: {
    isLength: {
      options: {
        min: 3,
        max: 36,
      },
      errorMessage: 'Name must be at least 3 to 36 characters',
    },
  },
  model: {
    isLength: {
      options: {
        min: 3,
        max: 36,
      },
      errorMessage: 'Model must be at least 3 to 36 characters',
    },
  },
  price: {
    isNumeric: {
      errorMessage: 'Price must be a number',
    },
  },
  stock: {
    isNumeric: {
      errorMessage: 'Price must be a number',
    },
  },
};
