import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import useAxiosIntercept from "@/hooks/useAxiosIntercept";
import useAuth from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/ui/pagination";
import ContactForm from "./contact-form";

export default function Contact() {
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [size, setSize] = useState("10");
  const [pageSize, setPageSize] = useState();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const apiPrivate = useAxiosIntercept();
  const { auth } = useAuth();
  const {
    user: { name },
  } = jwtDecode(auth.token);

  const getContactByUser = async () => {
    try {
      const { data, status } = await apiPrivate.get("/api/contacts/all");

      if (status === 200) {
        setContacts(data.data);
        setPageSize(data.paging.total_page);
      }
    } catch (error) {
      setError(error);
    } finally {
    }
  };

  const getSearchedContact = async () => {
    try {
      const { data, status } = await apiPrivate.get(
        `/api/contacts?${searchParams}`,
      );
      if (status === 200) {
        setContacts(data.data);
        setPageSize(data.paging.total_page);
      }
    } catch (error) {
      setError(error);
    } finally {
    }
  };

  const deleteContact = async (id) => {
    try {
      const { status } = await apiPrivate.delete(`/api/contacts/${id}`);
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmitSearch = () => {
    let params = "";

    if (searchKey) {
      params = `name=${searchKey}`;
      if (size) {
        params += `&size=${size}`;
      }
    } else {
      params = `size=${size}`;
    }

    setCurrentPage(1);
    setSearchParams(params);
    setIsSubmit(true);
  };

  const handleEditContact = (contact) => {
    setEditData(contact);
    setIsEditing(true);
  };

  useEffect(() => {
    const pages = [];
    const query = new URLSearchParams(window.location.search);
    query.set("page", currentPage);

    for (let i = 1; i <= pageSize; i++) {
      pages.push(i);
    }

    setPages(pages);
    setSearchParams(query);
  }, [isSubmit, pageSize, currentPage]);

  useEffect(() => {
    if (searchParams.get("name") || searchParams.get("size")) {
      setSearchKey(searchParams.get("name") || "");
      setSize(searchParams.get("size"));
      getSearchedContact();
    } else {
      getContactByUser();
    }
    setIsSubmit(false);
  }, [searchParams, isSubmit]);

  return (
    <section className="mt-20 py-4">
      <h1>Contact owned by {name}</h1>
      <div className="my-4 flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Search by name"
          name="search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" onClick={handleSubmitSearch}>
          Search
        </Button>
      </div>
      <ul className="w-1/2">
        {contacts.length > 0 ? (
          contacts.map((contact) => {
            const { id, email, first_name, last_name, phone_number } = contact;

            return (
              <li key={id} className="border-b py-2 last:border-0">
                <div className="flex items-center justify-between gap-x-4">
                  <span>
                    <p>
                      Name: {first_name} {last_name}
                    </p>
                    <p>Email: {email}</p>
                    <p>Phone Number: {phone_number}</p>
                  </span>
                  <span className="flex gap-x-2">
                    <button
                      className="flex items-center justify-center gap-x-2 rounded-lg bg-zinc-950 px-4 py-2"
                      onClick={() => handleEditContact(contact)}
                    >
                      <p className="font-medium text-white">Edit</p>

                      <Pencil className="text-white" />
                    </button>
                    <button
                      className="flex items-center justify-center gap-x-2 rounded-lg bg-zinc-950 px-4 py-2"
                      onClick={() => deleteContact(contact.id)}
                    >
                      <p className="font-medium text-white">Delete</p>

                      <Trash2 className="text-white" />
                    </button>
                  </span>
                </div>
              </li>
            );
          })
        ) : (
          <p>No contact found</p>
        )}
      </ul>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="w-1/4">
        <ContactForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editData={editData}
        />
      </div>
    </section>
  );
}
