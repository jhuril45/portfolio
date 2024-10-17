import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the usePathname hook
import {ParseDB} from "../../parseDb.js";
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const projectList = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const parseClass = new ParseDB();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const arr =[]
        const parseQuery = parseClass.parseQuery("project");
        parseQuery.ascending("order");
        const projects = await parseQuery.find();
        projects.forEach(element => {
          arr.push({
            name: element.get('name'),
            description: element.get('description'),
            tech_stack: element.get('tech_stack'),
            responsibility: element.get('responsibility'),
            image: element.get('image').url()
          })
        
        });
        dispatch({ type: 'UPDATE_PROJECTS', payload: arr });
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);

  const pathname = usePathname(); // Get the current pathname

  // Function to check if the link is active
  const isActive = (path) => pathname === path;

  return (
    <nav className="navbar">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div>
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className={`rounded-md px-3 py-2 text-sm font-medium  ${
                    isActive('/') ? 'bg-gray-900 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white'
                  }`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className={`rounded-md px-3 py-2 text-sm font-medium  ${
                    isActive('/projects') ? 'bg-gray-900 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white'
                  }`}
                  aria-current={isActive('/projects') ? 'page' : undefined}
                >
                  Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
