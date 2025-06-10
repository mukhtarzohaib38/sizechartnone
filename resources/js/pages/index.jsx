import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Pagination,
  Spinner
} from '@shopify/polaris';
import {
  EditIcon,
  DeleteIcon
} from '@shopify/polaris-icons';

const NewPage = () => {
  const isSmallScreen = useBreakpoints().smDown;
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [shop, setShop] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ordersPerPage = 10;
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange
  } = useIndexResourceState(orders);

  const handleSubmit = async (payload) => {
    const url = "/get_charts";
    try {
      setIsLoading(false); // Show loading state
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
      const transformedOrders = data.map((chart) => ({
        id: chart.id.toString(),
        name: chart.name,
        status: chart.status === "true"
          ? <Badge tone="success">Active</Badge>
          : <Badge>Draft</Badge>,
        priority: chart.priority,
        clicks: Math.floor(Math.random() * 100), // Replace with actual value if available
      }));

      setOrders(transformedOrders);
      setIsLoading(true);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const delRowChart = async (id) => {
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
      const transformedOrders = data.map((chart) => ({
        id: chart.id.toString(),
        name: chart.name,
        status: chart.status === "true"
          ? <Badge tone="success">Active</Badge>
          : <Badge>Draft</Badge>,
        priority: chart.priority,
        clicks: Math.floor(Math.random() * 100),
      }));

      setOrders(transformedOrders);
    } catch (error) {
      console.error("Error deleting chart:", error.message);
    }
  };

  const deleteAllCharts = async (selectedIds) => {
    const url = "/dell_all_charts";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedIds),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      await handleSubmit(shop); // Re-fetch updated data
    } catch (error) {
      console.error("Error deleting all charts:", error.message);
    }
  };

  const promotedBulkActions = [
    {
      content: 'Delete All',
      icon: DeleteIcon,
      onAction: () => deleteAllCharts(selectedResources),
    }
  ];

  const rowMarkup = paginatedOrders.map(({ id, name, status, priority, clicks }, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
   
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
          <Button onClick={() => navigate('/edit?id=' + id)} icon={EditIcon} variant="tertiary" />
          <Button onClick={() => delRowChart(id)} icon={DeleteIcon} variant="tertiary" />
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  useEffect(() => {
    const shopParam = document.getElementById('usernamemain')?.value;
    if (shopParam) {
      setShop(shopParam);
      handleSubmit(shopParam);
    }
  }, [location.pathname]);

  return (
    <Page
      title="Manage Charts"
      fullWidth
      subtitle="Create multiple size charts for different products and collections."
      primaryAction={
        <Button variant="primary" onClick={() => navigate('/create')}>
          Create Chart
        </Button>
      }
    >
      <Layout>
        <Layout.Section>
          <LegacyCard>
            {isLoading ? (
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
            ) : (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <Spinner accessibilityLabel="Loading charts" size="large" />
              </div>
            )}
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default NewPage;
