const corsConfig = {
  origin: (process.env.UI as string)?.split(',') || '*',
};

export default corsConfig;
