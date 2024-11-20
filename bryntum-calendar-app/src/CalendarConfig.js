

const calendarProps = {
  date: new Date(2022, 2, 15),
  crudManager: {
      transport: {
          load: {
              url: '/data.json',  // Loading the data from the public folder
          },
      },
      autoLoad: true
  }
};

export { calendarProps };
