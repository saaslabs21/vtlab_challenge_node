import Deliveries from "@/models/Deliveries.model";

const find = async (req) => {
  // some vars
  let query = {};
  let limit = req.body.limit
    ? req.body.limit > 100
      ? 100
      : parseInt(req.body.limit)
    : 100;
  let skip = req.body.page
    ? (Math.max(0, parseInt(req.body.page)) - 1) * limit
    : 0;
  let sort = { _id: 1 };

  // if date provided, filter by date
  if (req.body.when) {
    query["when"] = {
      $gte: req.body.when,
    };
  }

  let totalResults = await Deliveries.find(query).countDocuments();

  if (totalResults < 1) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find any delivery`,
      },
    };
  }

  let deliveries = await Deliveries.find(query)
    .skip(skip)
    .sort(sort)
    .limit(limit);

  return {
    totalResults: totalResults,
    deliveries,
  };
};

const create = async (req) => {
  try {
    await Deliveries.create(req.body);
  } catch (e) {
    throw {
      code: 400,
      data: {
        message: `An error has occurred trying to create the delivery:
          ${JSON.stringify(e, null, 2)}`,
      },
    };
  }
};

const findOne = async (req) => {
  let delivery = await Deliveries.findOne({ _id: req.body.id });
  if (!delivery) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find a delivery with the sent ID`,
      },
    };
  }
  return delivery;
};

const search = async (req) => {
  let query = {};
  let limit = req.body.limit
    ? req.body.limit > 100
      ? 100
      : parseInt(req.body.limit)
    : 100;
  let skip = req.body.page
    ? (Math.max(0, parseInt(req.body.page)) - 1) * limit
    : 0;
  let sort = { _id: 1 };
  if (req.body.dateFrom && req.body.dateTo) {
    query["when"] = { $gte: req.body.dateFrom, $lt: req.body.dateTo };
  }

  let totalResults = await Deliveries.find(query).countDocuments();

  if (totalResults < 1) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find any delivery`,
      },
    };
  }
  let prodWeightCheck = {};
  if (req.body.weight) {
    prodWeightCheck = {
      weight: {
        $gte: req.body.weight,
      },
    };
  }

  let deliveries = await Deliveries.find(query)
    .populate("products", null, prodWeightCheck)
    .skip(skip)
    .sort(sort)
    .limit(limit);

  const deliveyIds = deliveries.map((deliver) => deliver.id);
  deliveries = await Deliveries.find({
    _id: {
      $in: deliveyIds,
    },
  })
    .populate("products")
    .skip(skip)
    .sort(sort)
    .limit(limit);

  return {
    totalResults: totalResults,
    deliveries,
  };
};

const deleteOne = async (req) => {
  return await Deliveries.remove({ _id: req.params.id });
};

export default {
  find,
  create,
  findOne,
  search,
  deleteOne,
};
