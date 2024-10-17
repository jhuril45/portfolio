'use client';
const ProjectDetails = ({ data }) => {

  return (
    <>
      <p className="text-sm text-gray-800">
        <span>Description: </span> {data.description}
      </p>

      <p className="mt-4 text-sm text-gray-800">
      <strong>Tech Stack: </strong>
      {data.tech_stack.map((item, index) => (
          <li key={index}>{item}</li> // Each item is rendered as a list element
        ))}
      </p>

      <p className="mt-4 text-sm text-gray-800">
      <strong>Responsibility: </strong>{data.responsibility}
      </p>
    </>
  );
};

export default ProjectDetails;
