import refreshService from "../service/refresh-token.js";

const refresh = async (req, res, next) => {
  try {
    const result = await refreshService(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default refresh;
