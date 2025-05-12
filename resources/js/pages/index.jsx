import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Page,
  Button,
  Badge,
  Layout,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  useBreakpoints,
  Text,
  Pagination
} from '@shopify/polaris';
import {
  EditIcon, DeleteIcon
} from '@shopify/polaris-icons';
const NewPage = () => {
  const isSmallScreen = useBreakpoints().smDown;
  const navigate = useNavigate();
  const [orders, setorders] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [shop, setShop] = useState('');
  const [Loading, setLoading] = useState(false);


  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = paginatedOrders.map(({ id, name, status, priority, clicks }, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
      onClick={(e) => { e.preventDefault(); }}
    >
      <IndexTable.Cell>
        <Text as="span" fontWeight="bold">{name}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{status}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span">{priority}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span">{clicks}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
          <div style={{ display: "flex", gap: "5px" }}>
            <Button onClick={() => navigate('/edit?id='+ id)} icon={EditIcon} variant="tertiary" />

          <Button onClick={() => delrowchart(id)}  icon={DeleteIcon} variant="tertiary" />
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  const delrowchart = async (id) => {
    const url = "/dell_chart";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([id, shop]),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      const transformedOrders = data.map((chart, index) => ({
        id: chart.id.toString(),
        name: chart.name,
        status: chart.status == "true"
          ? <Badge tone="success">Active</Badge>
          : <Badge>Draft</Badge>,
        priority: chart.priority,
        clicks: Math.floor(Math.random() * 100),
      }));

      setorders(transformedOrders);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  }
  const promotedBulkActions = [
    {
      content: 'Delete All',
      icon: DeleteIcon,
      onAction: () => { dell_all(selectedResources) },
    }
  ];
  const dell_all = async (payload) => {
    const url = "/dell_all_charts";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      handleSubmit(shopParam);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };
  const handleSubmit = async (payload) => {
    const url = "/get_charts";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      const transformedOrders = data.map((chart, index) => ({
        id: chart.id.toString(),
        name: chart.name,
        status: chart.status == "true"
          ? <Badge tone="success">Active</Badge>
          : <Badge>Draft</Badge>,
        priority: chart.priority,
        clicks: Math.floor(Math.random() * 100),
      }));

      setorders(transformedOrders);
      setLoading(true);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };
  useEffect(() => {
    const shopParam = document.getElementById('usernamemain')?.value;
    if (shopParam) {
      setShop(shopParam);
      handleSubmit(shopParam);
    }
  }, []);



  return (
    <Page
      title="Manage Charts"
      fullWidth
      subtitle="Create multiple size charts for different products and collections."
      primaryAction={
        <Button variant="primary" onClick={() => navigate('/create')}>
          Create Chart
        </Button>}
    >
      <Layout>
        <Layout.Section>
          <LegacyCard>
            {Loading ?
              <>
                <IndexTable
                  condensed={isSmallScreen}
                  resourceName={resourceName}
                  itemCount={orders.length}
                  selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                  onSelectionChange={handleSelectionChange}
                  headings={[
                    { title: 'Name', alignment: 'start' },
                    { title: 'Status', alignment: 'start' },
                    { title: 'Priority', alignment: 'start' },
                    { title: 'Clicks', alignment: 'start' },
                    { title: 'Action', alignment: 'start' },
                  ]}
                  promotedBulkActions={promotedBulkActions}
                  selectMode="manual"
                >
                  {rowMarkup}
                </IndexTable>
                <div style={{ display: "flex", justifyContent: "center", margin: "10px", paddingBottom: "12px" }}>
                  <Pagination
                    onPrevious={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    onNext={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    hasPrevious={currentPage > 1}
                    hasNext={currentPage < totalPages}
                    label={`Page ${currentPage} of ${totalPages}`}
                  />
                </div>
              </>
              : ''}
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default NewPage;
