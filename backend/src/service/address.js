import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response.js";
import { createAddressValidation, getAddressValidation, updateAddresssValidation } from "../validation/address.js";
import { getContactValidation } from "../validation/contact.js";
import { validate } from "../validation/validation.js";

const handleCheckContact = async (user, contactId) => {
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

  return contactId;
};

const create = async (user, contactId, req) => {
  contactId = await handleCheckContact(user, contactId);

  const address = validate(createAddressValidation, req);
  address.contact_id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const get = async (user, contactId, addressId) => {
  contactId = await handleCheckContact(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, "Address is not found!");
  }

  return address;
};

const update = async (user, contactId, req) => {
  contactId = await handleCheckContact(user, contactId);
  const address = validate(updateAddresssValidation, req);

  const targetAddress = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: address.id,
    },
  });

  if (!targetAddress) {
    throw new ResponseError(404, "Address is not found!");
  }

  return prismaClient.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    select: { id: true, street: true, city: true, province: true, country: true, postal_code: true },
  });
};

const remove = async (user, contactId, addressId) => {
  contactId = await handleCheckContact(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const targetAddress = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
  });

  if (!targetAddress) {
    throw new ResponseError(404, "Address is not found!");
  }

  return prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

const list = async (user, contactId) => {
  contactId = await handleCheckContact(user, contactId);

  return prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

export default { create, get, update, remove, list };
