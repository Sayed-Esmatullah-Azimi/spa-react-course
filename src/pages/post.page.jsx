import { Center, LoadingOverlay, Notification, Pagination, Select, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getToDo } from "../utility/api";
import { Link, useSearchParams } from "react-router-dom";

function PostPage() {
  const [searchParams,setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-todo",searchParams.get('page') || 1 ,searchParams.get('limit') || 10],
    queryFn: ()=> getToDo(searchParams.get('page') ||1 ,searchParams.get('limit') || 10),
    keepPreviousData: true,
  });

  const updateQueryParams = (newParams) => {
    const mergedParams = { ...Object.fromEntries(searchParams), ...newParams };
    setSearchParams(mergedParams);

  };
  
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
      <Text size="xl" variant="gradient">
        Post
      </Text>
      <Select
        label="Per page"
        placeholder="Select limit"
        value={searchParams.get('limit') || 10}
        onChange={(value) => updateQueryParams({limit: value})}
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
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.data?.map((value) => (
            <Table.Tr key={value.id}>
              <Table.Td>{value.id}</Table.Td>
              <Table.Td>{value.title}</Table.Td>
              <Table.Td>
                <Link to={`/post/${value.id}`}>more...</Link>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Center mt={'lg'}>
      <Pagination onChange={(value) => updateQueryParams({page: value})} total={100 / Number(searchParams.get('limit') || 10)} value={Number(searchParams.get('page') || 1)}  />
      </Center>
    </div>
  );
}

export default PostPage;
