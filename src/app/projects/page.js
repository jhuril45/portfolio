'use client';

import {ParseDB} from "../../parseDb.js";
import { useDispatch, useSelector } from 'react-redux';

import React, { useState, useEffect } from 'react';
import ProjectDetails from "../components/ProjectDetails";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
export default function Home() {

  const [isModalOpen, setModalOpen] = useState(false);
  // const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({name: '', description: '', tech_stack: []});
  const parseClass = new ParseDB();

  const projectList = useSelector((state) => state.projects);
  const dispatch = useDispatch();
    useEffect(() => {
      // Set the document title based on the value
      document.title = "Project List("+projectList.length+")";
  }, [projectList]);
  
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
  

  function viewProject (item) {
    setSelectedProject(item)
    setModalOpen(true)
  }

  return (
    <>
      <main className="px-6 py-4 sm:px-24">
        <div className="bg-white rounded-s">
          <div className="px-4 sm:px-6 sm:py-5 ">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Projects</h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {projectList.map((item, index) => (
                <div className="group relative shadow-xl " onClick={() => viewProject(item)} key={'project-'+index}>
                  <div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                    <img src={item.image} className="project-image"/>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div className="p-4">
                      <h3 className="text-lg text-gray-900">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {item.name}
                        </a>
                      </h3>
                      <h3 className="text-sm text-gray-600">
                        {item.responsibility}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </div>

        <Dialog open={isModalOpen} onClose={setModalOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {selectedProject.name}
                      </DialogTitle>
                      <div className="mt-2">
                        <ProjectDetails data={selectedProject}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setModalOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </main>

      

    </>
    
  );
}
