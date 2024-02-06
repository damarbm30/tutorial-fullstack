import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response.js";
import { usernameValidation } from "../validation/user.js";

const create = async (user, req) => {
  const contact = validate(createContactValidation, req);
  contact.user_id = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
    },
  });
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      user_id: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact is not found");
  }

  return contact;
};

const update = async (user, req) => {
  const contact = validate(updateContactValidation, req);

  const targetContact = await prismaClient.contact.findFirst({
    where: {
      user_id: user.username,
      id: contact.id,
    },
  });

  if (!targetContact) {
    throw new ResponseError(404, "Contact is not found!");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone_number: contact.phone_number,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      user_id: user.username,
      id: contactId,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact is not found!");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const search = async (user, req) => {
  req = validate(searchContactValidation, req);

  const skip = (req.page - 1) * req.size;

  const filters = [];

  const addFilter = (key, value) => {
    if (value) {
      filters.push({ [key]: { contains: value, mode: "insensitive" } });
    }
  };

  filters.push({
    user_id: user.username,
  });
  if (req.name) {
    filters.push({
      OR: [
        { first_name: { contains: req.name, mode: "insensitive" } },
        { last_name: { contains: req.name, mode: "insensitive" } },
      ],
    });
  }
  addFilter("email", req.email);
  addFilter("phone_number", req.phone_number);

  const searchResult = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: req.size,
    skip: skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: searchResult,
    paging: {
      page: req.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / req.size),
    },
  };
};

const list = async (username) => {
  username = validate(usernameValidation, username);

  const contacts = await prismaClient.contact.findMany({
    where: {
      user_id: username,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
    },
  });

  if (!contacts) {
    throw new ResponseError(404, "Contact is not found");
  }

  const totalItems = await prismaClient.contact.count();

  return {
    data: contacts,
    paging: {
      total_item: totalItems,
      total_page: Math.ceil(totalItems / 10),
    },
  };
};

export default { create, get, update, remove, search, list };
