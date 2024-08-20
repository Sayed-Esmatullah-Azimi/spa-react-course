import { Center, LoadingOverlay, Notification, Pagination, Select, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getToDo } from "../utility/api";
import { useState } from "react";

function TodoPage() {
  const [page,setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-todo",page ,limit],
    queryFn: ()=> getToDo(page ,limit),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (isError) {
    return (
      <Notification title="Error" color="red">
        An error occurred while fetching the data.
      </Notification>
    );
  }

  return (
    <div>
      <Select
        label="Per page"
        placeholder="Select limit"
        value={limit.toString()}
        onChange={(value) => setLimit(parseInt(value, 10))}
        data={[
          { value: '10', label: '10' },
          { value: '20', label: '20' },
          { value: '30', label: '30' },
          { value: '50', label: '50' }
        ]}
      />
      <Table striped withBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Completed</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.data?.map((value) => (
            <Table.Tr key={value.id}>
              <Table.Td>{value.id}</Table.Td>
              <Table.Td>{value.title}</Table.Td>
              <Table.Td>{value.completed ? 'Yes' : 'No'}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Center mt={'lg'}>
      <Pagination total={200/10} value={page}  onChange={setPage}/>
      </Center>
    </div>
  );
}

export default TodoPage;
