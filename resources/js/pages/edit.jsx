// import React from 'react';
import { useLocation } from 'react-router-dom';
import { DesktopIcon, MarketsRupeeFilledIcon } from '@shopify/polaris-icons';
import {  Card,SkeletonBodyText, SkeletonDisplayText ,Modal,TextContainer} from '@shopify/polaris';
import { SaveBar } from '@shopify/app-bridge-react';
// export default function Edit() {
//   const query = new URLSearchParams(useLocation().search);
//   const id = query.get('id'); 

//   return <h1>Muneeb is editing ID: {id}</h1>;
// }
import { Page, Badge, LegacyCard, Tabs, Button, Thumbnail, LegacyStack, Checkbox, Text, Grid, TextField, RadioButton, Icon, Popover, ActionList, DropZone } from '@shopify/polaris';

import {
  QuestionCircleIcon, 
  PlusIcon,
} from '@shopify/polaris-icons';
import { useState, useEffect, useRef, useCallback } from "react";
import "quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';


export default function Create() {
  const navigate = useNavigate();
  const [pagedata, setpagedata] = useState([]);
  const [pageload, setpageload] = useState(false);
  const [value7, setValue7] = useState(pagedata.title);
  const [value71, setValue71] = useState(pagedata.subtitle);
  const [QuillEditor, setQuillEditor] = useState(null);
  const quillRef = useRef(null);
    const [shop, setShop] = useState('');
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id'); 
  useEffect(() => {
    import("react-quill").then((Quill) => {
      setQuillEditor(() => Quill.default);
    });
    get_chart(id)
  }, []);
  const get_chart = async (payload) => {
    const url = "/get_chart";
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
      const datae = await response.json();
      setpagedata(datae);
      setpageload(true)
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };
  useEffect(() => {
  if (pagedata?.dataTable && Array.isArray(pagedata.dataTable)) {
    const flattenedData = pagedata.dataTable.flat();
    setData(flattenedData);
  }
}, [pagedata]);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      document.querySelector(".ql-undo").addEventListener("click", () => {
        quill.history.undo();
      });
      document.querySelector(".ql-redo").addEventListener("click", () => {
        quill.history.redo();
      });
    }
  }, [QuillEditor]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["undo", "redo"],
    ],
    history: {
      delay: 200,
      maxStack: 500,
      userOnly: true,
    },
  };


  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(pagedata.selectedPreset);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTab(selectedTabIndex),
    []
  );
  const toggleModal = () => setActive(!active);
  const [active, setActive] = useState(false);
  const presets = [
    {
      id: '1',
      label: "Men Tops",
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/menTop.svg',
      title: "<h1>Men's Top Size Chart</h1>",
      headers: ["Size", "Bust", "Waist", "Hip"],
      subtitle: "<p>This size chart is to determine your top's size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit. If your chest and waist measurements correspond to two different suggested sizes, you should order the one which is indicated by the measurement of your chest.</p>",
      data: [["S", "10", "20", "30"], ["M", "10", "20", "30"], ["L", "10", "20", "30"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Men_Top.png?v=1741975230"
      ]
    },
    {
      id: '2',
      label: "Men Bottoms",
      headers: ["Size", "Waist", "Hip"],
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/menBot.svg',
      title: "<h1>Men's Bottom Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your bottom's size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit.</p>",
      data: [["S", "11", "21", "31"], ["M", "11", "21", "31"], ["L", "11", "21", "31"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Men_Bottom.png?v=1741975229",
       
      ]
    },
    {
      id: '3',
      label: "Men Shoes",
      headers:["EU Size", "UK Size", "US Size", "Foot Length"]      ,
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/menShoes.svg',
      title: "<h1>Men's Shoes Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your shoe size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit.</p>",
      data: [["S", "12", "22", "32"], ["M", "12", "22", "32"], ["L", "12", "22", "32"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Men_Shoes.png?v=1741975229"
      ]
    },
    {
      id: '4',
      label: "Womens Tops",
      headers: ["Size", "Chest", "Waist", "Hips"]      ,
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/womanTop.svg',
      title: "<h1>Women's Top Size Chart/h1>",
      subtitle: "<p>This size chart is to determine your top's size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit. If your chest and waist measurements correspond to two different suggested sizes, you should order the one which is indicated by the measurement of your chest./p>",
      data: [["S", "13", "23", "33"], ["M", "13", "23", "33"], ["L", "13", "23", "33"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Women_Top.png?v=1741975231"
      ]
    },
    {
      id: '5',
      label: "Womens  Bottom",
      headers: ["Size", "Chest", "Waist", "Hips"],
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/womanBot.svg',
      title: "<h1>Women's Bottom Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your bottom's size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit.</p>",
      data: [["S", "14", "24", "34"], ["M", "14", "24", "34"], ["L", "14", "24", "34"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Women_Bottom.png?v=1741975231",
       
      ]
    },
    {
      id: '6',
      label: "Womens Shoes",
      headers: ["EU Size", "UK Size", "US Size", "Foot Length"]  ,
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/womanShoes.svg',
      title: "<h1>Women's Shoes Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your shoe size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit</p>",
      data: [["S", "15", "25", "35"], ["M", "15", "25", "35"], ["L", "15", "25", "35"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Women_Shoes.png?v=1741975231"
      ]
    },
    {
      id: '7',
      label: "Girls Top",
      headers: ["Age",'size', "Height", "Waist", "Hip"],
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/girlTop.svg',
      title: "<h1>Girl's Top Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your top's size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit. If your chest and waist measurements correspond to two different suggested sizes, you should order the one which is indicated by the measurement of your chest.</p>",
      data: [["S", "10", "20", "30"], ["M", "10", "20", "30"], ["L", "10", "20", "30"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Girl_Top.png?v=1741975229"
      ]
    },
    {
      id: '8',
      label: "Girls Bottoms",
      headers:  ["Age",'size', "Height", "Waist", "Hip",'Insceam'],
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/girlBot.svg',
      title: "<h1>Girl's Bottom Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your bottom's size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit.</p>",
      data: [["S", "11", "21", "31"], ["M", "11", "21", "31"], ["L", "11", "21", "31"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Girl_Bottom.png?v=1741975230",
       
      ]
    },
    {
      id: '9',
      label: "Boys Top",
      headers:["Age",'size', "Height", "Waist", "Hip",'Insceam'],
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/boyTop.svg',
      title: "<h1>Boy's Top Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your top's size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit. If your chest and waist measurements correspond to two different suggested sizes, you should order the one which is indicated by the measurement of your chest.</p>",
      data: [["2", "12", "22", "32",'22','2'], ["2", "12", "22", "32",'2','2'], ["2", "12", "22", "32",'2','2'],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Boy_Top_d00608d4-7457-419d-8b8a-2d9c976bbfca.png?v=1741975231"
      ]
    },
    {
      id: '10',
      label: "Boys Bottoms",
      headers:["Age",'size', "Height", "Waist", "Hip",'Insceam'],
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/boyBot.svg',
      title: "<h1>Boy's Bottom Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your bottom's size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit.</p>",
      data: [["S", "13", "23", "33"], ["M", "13", "23", "33"], ["L", "13", "23", "33"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Boy_Bottom.png?v=1741975230"
      ]
    },
    {
      id: '11',
      label: "Kids Shoes",
      headers: ["Size", "UK Size", "US Size", "Foot Lenght"],
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/kidShoes.svg',
      title: "<h1>Kid's Shoes Size Chart</h1>",
      subtitle: "<p>This size chart is to determine your shoe size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit.</p>",
      data: [["23", "14", "24", "34"], ["23", "14", "24", "34"], ["2", "14", "24", "34"],],
      url: [
        "https://cdn.shopify.com/s/files/1/0868/9991/7135/files/Kid_Shoes.png?v=1741975229",
       
      ]
    },
    {
      id: '12',
      label: "None",
      headers: ["Size", "Bust", "Waist", "Hip"],
      imgSrc: 'https://cdnapps.avada.io/sizechart/onboardingImages/none.svg',
      title: "<h1>Title 6</h1>",
      subtitle: "<h1>This size chart is to determine your shoe size. If any of your measurement is on the borderline between two sizes, you can pick the smaller size for a tighter fit or the larger size for a looser fit.</h1>",
      data: [["S", "15", "25", "35"], ["M", "15", "25", "35"], ["L", "15", "25", "35"],],
     
    }
  ];

  const tabs = [
    { id: 'step1', content: 'Step 1: Content', panelID: 'step1-content' },
    { id: 'step2', content: 'Step 2: Settings', panelID: 'step2-settings' },
  ];

  const [value, setValue] = useState(pagedata.name);

  const handleChange = useCallback(
    (newValue) => setValue(newValue),
    
    [],
     shopify.saveBar.show('my-save-bar')
  );

  const [value2, setValue2] = useState(pagedata.priority);

  const handleChange2 = useCallback(
    (newValue) => setValue2(newValue),
    [],
     shopify.saveBar.show('my-save-bar')
  );
  const [isChecked, setIsChecked] = useState(pagedata.status);
  const handleToggle = () => {
    setIsChecked(!isChecked);
     shopify.saveBar.show('my-save-bar')
  };
  const [isCheckedp1, setIsCheckedp1] = useState(pagedata.storefront);
  const handleTogglep1 = () => {
    setIsCheckedp1(!isCheckedp1);
     shopify.saveBar.show('my-save-bar')
  };
  const [isChecked2, setIsChecked2] = useState(pagedata.status2);
  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
     shopify.saveBar.show('my-save-bar')
  };
  const [value3, setValue3] = useState(pagedata.product);

  const handleChange3 = useCallback(
    (_, newValue) => setValue3(newValue),
    [],
     shopify.saveBar.show('my-save-bar')
  );
  const [value8, setValue8] = useState('disabled');

  const handleChange8 = useCallback(
    (_, newValue) => setValue8(newValue),
    [],
  );
  const [value4, setValue4] = useState(pagedata.country);

  const handleChange6 = useCallback(
    (_, newValue) => setValue4(newValue),
    [],
  );
  const [checked, setChecked] = useState(pagedata.homepage);
  const handleChange4 = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );
  const [checked1, setChecked1] = useState(pagedata.collectionPage);
  const handleChange5 = useCallback(
    (newChecked) => setChecked1(newChecked),
    [],
  );
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Import/Export Table
    </Button>
  );
  const [headers, setHeaders] = useState([pagedata.headersTable]);
  
  const [data, setData] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [unit, setUnit] = useState(pagedata.unit);

  const cmToInch = (cm) => (isNaN(parseFloat(cm)) ? cm : (parseFloat(cm) / 2.54).toFixed(1));
  const inchToCm = (inch) => (isNaN(parseFloat(inch)) ? inch : (parseFloat(inch) * 2.54).toFixed(1));

  const getDisplayValue = (value, columnIndex) => (columnIndex === 0 ? value : unit === "cm" ? value : cmToInch(value));

  const handleValueChange = (rowIndex, columnIndex, newValue) => {
    const newData = [...data];
    newData[rowIndex][columnIndex] =
      columnIndex === 0 ? newValue : unit === "inch" ? inchToCm(newValue) : newValue;
    setData(newData);
  };

  const addColumn = () => {
    setHeaders([...headers, `Column ${headers.length + 1}`]);
    setData(data.map((row) => [...row, "0"]));
  };

  const addRow = () => {
    setData([...data, new Array(headers.length).fill("0")]);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

 const exportTable = () => {
  // Combine headers and data into CSV format
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => row.join(',')) // Data rows
  ].join('\n');

  // Include unit as a separate row or metadata if needed
  const finalCsv = `Unit,${unit}\n${csvContent}`;

  const blob = new Blob([finalCsv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'table-data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

  const importTable = (event) => {
  const file = event.target.files?.[0];
  if (file && file.type === 'text/csv') {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        const rows = text.split('\n').map(row => row.split(',').map(cell => cell.trim()));

        // Check if the first row is the unit metadata
        let newUnit = 'cm'; // Default unit
        let startRow = 0;
        if (rows[0][0].toLowerCase() === 'unit') {
          newUnit = rows[0][1] || 'cm';
          startRow = 1; // Skip the unit row
        }

        // Extract headers and data
        const newHeaders = rows[startRow];
        const newData = rows.slice(startRow + 1).filter(row => row.length === newHeaders.length && row.some(cell => cell !== ''));

        setHeaders(newHeaders);
        setData(newData);
        setUnit(newUnit);
      } catch (error) {
        alert('Invalid CSV file format');
      }
    };
    reader.readAsText(file);
  } else {
    alert('Please upload a valid CSV file');
  }
};
  const openform = () => {
    document.getElementById('fileInput').click();

  }
  const handleHeaderChange = (index, newValue) => {
    const newHeaders = [...headers];
    newHeaders[index] = newValue;
    setHeaders(newHeaders);
  };

  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([pagedata.images]);
  const [popoverActive7, setPopoverActive7] = useState(false);
  const validImageTypes = ["image/jpeg", "image/png"];
  const handleDropZoneDrop = useCallback(async (_dropFiles, acceptedFiles) => {
    const filteredFiles = acceptedFiles.filter(file => validImageTypes.includes(file.type));

    for (const file of acceptedFiles) {
      if (!validImageTypes.includes(file.type)) {
        alert(`Please upload a JPEG or PNG image.`);
        return;
      }
    }
useEffect(() => {
    const shopParam = document.getElementById('usernamemain')?.value;
    if (shopParam) {
      setShop(shopParam);
    }
  }, []);
    if (filteredFiles.length > 0) {
      const formData = new FormData();
      filteredFiles.forEach(file => {
        formData.append("images[]", file);
      });

      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        setImageUrls(prev => [...prev, ...data.urls]);
        // setFiles(prev => [...prev, ...filteredFiles]);
        setFiles([...files, ...filteredFiles]);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  }, [files, imageUrls]);
 const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    id,
    name: value,
    priority: value2,
    status: isChecked,
    storefront: isCheckedp1,
    status2: isChecked2,
    product: value3,
    country: value4,
    homepage: checked,
    collectionPage: checked1,
    title: value7,
    subtitle: value71,
    selectedPreset,
    unit,
    headersTable: JSON.stringify(headers), // Serialize arrays
    dataTable: JSON.stringify(data),
    images: JSON.stringify(imageUrls),
    shopname: id,
  };

    console.log("Saving payload:", payload); // Debug payload

    try {
      const response = await fetch("/save_chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      shopify.toast.show("Chart saved successfully!");
      shopify.saveBar.hide("my-save-bar");
        navigate("/");
      await get_chart(id);
    } catch (error) {
      console.error("Error saving chart:", error.message);
      shopify.toast.show("Failed to save chart", { isError: true });
    }
  };
  //request
const formRef = useRef(null);
 useEffect(() => {
    if (pageload && pagedata) {
      setValue(pagedata.name || "");
      setValue2(pagedata.priority || "");
      setIsChecked(pagedata.status || false);
      setIsCheckedp1(pagedata.storefront || false);
      setIsChecked2(pagedata.status2 || false);
      setValue3(pagedata.product || "disabled");
      setValue4(pagedata.country || "option1");
      setChecked(pagedata.homepage || false);
      setChecked1(pagedata.collectionPage || false);
      setValue7(pagedata.title || "");
      setValue71(pagedata.subtitle || "");
      setSelectedPreset(pagedata.selectedPreset || "");
      setUnit(pagedata.unit || "cm");
     
    }
  }, [pageload, pagedata]);

  // Quill editor undo/redo setup
  useEffect(() => {
    if (quillRef.current && QuillEditor) {
      const quill = quillRef.current.getEditor();
      const undoButton = document.querySelector(".ql-undo");
      const redoButton = document.querySelector(".ql-redo");
      if (undoButton) undoButton.addEventListener("click", () => quill.history.undo());
      if (redoButton) redoButton.addEventListener("click", () => quill.history.redo());
      return () => {
        if (undoButton) undoButton.removeEventListener("click", () => quill.history.undo());
        if (redoButton) redoButton.removeEventListener("click", () => quill.history.redo());
      };
    }
  }, [QuillEditor]);
 const handleSave = async () => {
        console.log('Saving with name:', value); // Debug log
        if (formRef.current) {
          const fakeEvent = { preventDefault: () => {}, target: formRef.current };
          try {
            await handleSubmit(fakeEvent);
          } catch (error) {
            console.error('Save failed:', error);
            shopify.toast.show('Failed to save chart', { isError: true });
          }
        } else {
          console.error('Form reference is not available');
        }
      };
  const handleDiscard = () => {
    console.log('Discarding');
    if (pagedata) {
      setValue(pagedata.name || '');
      setValue2(pagedata.priority || '');
      setIsChecked(pagedata.status || false);
      setIsCheckedp1(pagedata.storefront || false);
      setIsChecked2(pagedata.status2 || false);
      setValue3(pagedata.product || '');
      setValue4(pagedata.country || '');
      setChecked(pagedata.homepage || false);
      setChecked1(pagedata.collectionPage || false);
      setValue7(pagedata.title || '');
      setValue71(pagedata.subtitle || '');
      setSelectedPreset(pagedata.selectedPreset || '');
      setUnit(pagedata.unit || 'cm');
      setHeaders(Array.isArray(pagedata.headersTable) ? pagedata.headersTable : ['Size', 'Bust', 'Waist', 'Hip']);
      setImageUrls(Array.isArray(pagedata.images) ? pagedata.images : []);
      setData(Array.isArray(pagedata.dataTable) ? pagedata.dataTable.flat() : []);
    }
    shopify.saveBar.hide('my-save-bar');
  };
  return (
   <Page
      fullWidth
      backAction={{ content: 'Back', onAction: () => navigate('/') }}
      title={value}
      titleMetadata={isChecked ? <Badge tone='success'>Active</Badge> : <Badge>Draft</Badge>}
    
    >
       <SaveBar id="my-save-bar">
        <button variant="primary" onClick={handleSave}>Save</button>
        <button onClick={handleDiscard}>Discard</button>
      </SaveBar>
      {pageload ?
      <form ref={formRef} method="post"  onSubmit={handleSubmit}>
        <input type='hidden' value={value} name='name' />
        <input type='hidden' value={value2} name='priority' />
        <input type='hidden' value={isChecked} name='status' />
        <input type='hidden' value={value3} name='product' />
        <input type='hidden' value={checked} name='homepage' />
        <input type='hidden' value={checked1} name='collectionPage' />
        <input type='hidden' value={value4} name='country' />
        <input type='hidden' value={isChecked2} name='status2' />
        <input type='hidden' value={selectedPreset} name='selectedPreset' />
        <input type='hidden' value={value7} name='title' />
        <input type='hidden' value={unit} name='unit' />
        <input type='hidden' value={headers} name='headersTable' />
        <input type='hidden' value={data} name='dataTable' />
        <input type='hidden' value={isCheckedp1} name='storefront' />
        <input type='hidden' value={imageUrls} name='images' />
        <input type='hidden' value={value71} name='subtitle' />
    <input type='hidden' value={id}  name='shopname'/>
         <Grid>
                  <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 8, xl: 8 }}>
                    <LegacyCard>
                      <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} fitted>
                        <LegacyCard.Section>
                          {selectedTab === 0 ? (
                            <>
                              <div style={{ display: "flex", gap: "3px", flexDirection: "column" }}>
                                <Text variant="headingMd" as="h5">
                                  Preset
                                </Text>
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(6, 1fr)",
                                    gap: "12px",
                                    alignItems: "center",
                                  }}
                                >
                                  {presets.map((preset) => (
                                    <div key={preset.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                      <Button variant='plain'
                                        key={preset.id}
                                        onClick={() => (setSelectedPreset(preset.label), setValue7(preset.title), setData(preset.data), setValue71(preset.subtitle),shopify.saveBar.show('my-save-bar'), setHeaders(preset.headers), setImageUrls(preset.url))}
                                        pressed={selectedPreset === preset.label}
                                      >
                                        <img src={preset.imgSrc} alt={preset.label} width="70" height="70" style={{
                                          borderRadius: "35px",
                                          border: selectedPreset === preset.label ? "3px solid #4c82e0" : "1px solid #ddd",
                                          background: selectedPreset === preset.label ? "#ededee" : "#f6f6f6"
                                        }} />
                                      </Button>
                                      <span style={{ fontSize: "14px", fontWeight: "500", marginTop: "4px" }}>
                                        {preset.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <hr style={{ margin: "12px -20px 12px -20px", borderColor: "#ececec" }} />
                              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                                {QuillEditor ? (
                                  <QuillEditor
                                    ref={quillRef}
                                    theme="snow"
                                    value={value7}
                                    onChange={setValue7}
                                    modules={modules}
                                    style={{ height: "120px", marginBottom: "20px" }}
                                  />
                                ) : (
                                  <p>Loading editor...</p>
                                )}
                              </div>
                              <input type="file" accept=".json" id="fileInput" onChange={importTable} style={{ display: "none" }} />
                              <hr style={{ margin: "42px -20px 12px -20px", borderColor: "#ececec" }} />
                              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
                                  <Button>Full Screen</Button>
                                  <Popover
                                    active={popoverActive}
                                    activator={activator}
                                    autofocusTarget="first-node"
                                    onClose={togglePopoverActive}
                                  >
                                    <ActionList
                                      actionRole="menuitem"
                                      items={[
                                        {
                                          content: 'Import Table',
                                          onAction: () => {
                                            openform();
                                          }
                                        },
                                        {
                                          content: 'Export Table',
                                          onAction: () => {
                                            exportTable();
                                          }
                                        }]}
                                    />
                                  </Popover>
                                </div>
                                <Text variant="headingXs" as="h6">
                                  Chose Your Table Unit
                                </Text>
                                <Text variant="bodyLg" as="p">
                                  The value will Autometically from CM to Viea Versa.
                                </Text>
                                <RadioButton
                                  label="Centimeter"
                                  type="radio" name="unit" value="cm" checked={unit === "cm"} onChange={() => setUnit("cm")}
                                />
                                <RadioButton
                                  label="Inch"
                                  type="radio" name="unit" value="inch" checked={unit === "inch"} onChange={() => setUnit("inch")}
                                />
                                <div>
                                  <div style={{ display: "flex", overflowX: "auto" }}>
                                    <table
                                      style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        textAlign: "center",
                                        tableLayout: "fixed",
                                      }}
                                    >
                                      <thead>
                                        <tr style={{ backgroundColor: "#f4f4f4" }}>
                                          {headers.map((header, index) => (
                                            <th
                                              key={index}
                                              style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                width: `${100 / headers.length}%`,
                                              }}
                                            >
                                              <input
                                                type="text"
                                                value={header}
                                                style={{
                                                  border: "none",
                                                  background: "transparent",
                                                  width: "100%",
                                                  textAlign: "center",
                                                }}
                                                onChange={(e) => handleHeaderChange(index, e.target.value)}
                                              />
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {data.map((row, rowIndex) => (
                                          <tr key={rowIndex} className="hover:bg-gray-50">
                                            {row.map((cell, cellIndex) => (
                                              <td
                                                key={cellIndex}
                                                style={{
                                                  border: "1px solid #ddd",
                                                  padding: "10px",
                                                  width: `${100 / headers.length}%`,
                                                }}
                                              >
                                                <input
                                                  type="text"
                                                  style={{
                                                    border: "none",
                                                    background: "transparent",
                                                    width: "100%",
                                                    textAlign: "center",
                                                  }}
                                                  value={getDisplayValue(cell, cellIndex)}
                                                  onChange={(e) =>
                                                    handleValueChange(rowIndex, cellIndex, e.target.value)
                                                  }
                                                />
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                    <div
                                      onClick={addColumn}
                                      style={{
                                        width: "30px",
                                        background: "#e5e7eb",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: "flex",
                                      }}
                                    >
                                      <Icon source={PlusIcon} />
                                    </div>
                                  </div>
        
                                  <div onClick={addRow} style={{ width: "95%", height: "26px", background: "#e5e7eb", cursor: "pointer", alignItems: "center", justifyContent: "center", display: "flex" }}><Icon source={PlusIcon} /></div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <Text variant="headingSm" as="h5">
                                    Show convert unit on Storefront
                                  </Text>
                                  <div style={{ display: "none" }}>
                                    <Checkbox
                                      label=""
                                      checked={isCheckedp1}
                                      onChange={handleTogglep1}
                                      ariaDescribedBy="toggle-switch"
                                    />
                                  </div>
                                  <div
                                    onClick={handleTogglep1}
                                    style={{
                                      width: "43px",
                                      height: "25px",
                                      borderRadius: "10px",
                                      backgroundColor: isCheckedp1 ? "#008060" : "#C4C4C4",
                                      position: "relative",
                                      cursor: "pointer",
                                      transition: "background-color 0.3s ease-in-out",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        borderRadius: "38%",
                                        backgroundColor: "#fff",
                                        position: "absolute",
                                        top: "49%",
                                        transform: "translateY(-50%)",
                                        left: isCheckedp1 ? "21px" : "4px",
                                        transition: "left 0.3s ease-in-out",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr style={{ margin: "42px -20px 12px -20px", borderColor: "#ececec" }} />
                              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        
                                <DropZone onDrop={handleDropZoneDrop} variableHeight>
                                  <br />
                                  <LegacyStack vertical alignment="center">
                                    <LegacyStack distribution="center" spacing="tight">
                                      {imageUrls.map((url, index) => (
                                        <Thumbnail key={index} size="large" source={url} alt={`Uploaded Image ${index + 1}`} />
                                      ))}
                                    </LegacyStack>
                                    <LegacyStack spacing="tight">
                                      <Popover
                                        active={popoverActive7}
                                        activator={<Button primary onClick={() => setPopoverActive7(!popoverActive7)}>Change Image</Button>}
                                        onClose={() => setPopoverActive7(false)}
                                      >
                                        <ActionList
                                          items={[{ content: "Upload File", onAction: () => document.querySelector("input[type=file]").click() }]}
                                        />
                                      </Popover>
                                      <Button variant="tertiary" >Change From URL</Button>
                                    </LegacyStack>
                                    <Text variant="bodyMd" as="p">Accepts .jpg, .png</Text>
                                  </LegacyStack>
                                  <br />
                                </DropZone>
                              </div>
                              <hr style={{ margin: "42px -20px 12px -20px", borderColor: "#ececec" }} />
                              <div style={{ display: "flex", gap: "10px", flexDirection: "column", marginBottom: "25px" }}>
                                {QuillEditor ? (
                                  <QuillEditor
                                    ref={quillRef}
                                    theme="snow"
                                    value={value71}
                                    onChange={setValue71}
                                    modules={modules}
                                    style={{ height: "120px", marginBottom: "20px" }}
                                  />
                                ) : (
                                  <p>Loading editor...</p>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                                <Text variant="headingMd" as="h5">
                                  Genral Settings
                                </Text>
                                <TextField
                                  label="Name"
                                  value={value}
                                  onChange={handleChange}
                                  autoComplete="off"
                                />
                                <TextField
                                  label="Priority"
                                  value={value2}
                                  onChange={handleChange2}
                                  type="number"
                                  autoComplete="off"
                                />
                                <Text variant="bodyLg" as="p">
                                  Higher numbers, higher priority. If different size charts have same positions, the one with the
                                  highest priority will be shown.
                                </Text>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <Text variant="headingSm" as="h5">
                                    Status
                                  </Text>
                                  <div style={{ display: "none" }}>
                                    <Checkbox
                                      label=""
                                      checked={isChecked}
                                      onChange={handleToggle}
                                      ariaDescribedBy="toggle-switch"
                                    />
                                  </div>
                                  <div
                                    onClick={handleToggle}
                                    style={{
                                      width: "43px",
                                      height: "25px",
                                      borderRadius: "10px",
                                      backgroundColor: isChecked ? "#008060" : "#C4C4C4",
                                      position: "relative",
                                      cursor: "pointer",
                                      transition: "background-color 0.3s ease-in-out",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        borderRadius: "38%",
                                        backgroundColor: "#fff",
                                        position: "absolute",
                                        top: "49%",
                                        transform: "translateY(-50%)",
                                        left: isChecked ? "21px" : "4px",
                                        transition: "left 0.3s ease-in-out",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr style={{ margin: "12px -20px 12px -20px", borderColor: "#ececec" }} />
                              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                                <Text variant="headingMd" as="h1" fontWeight='bold'>
                                  Display Position
                                </Text>
                                <Text variant="headingMd" as="h1" fontWeight='bold'>
                                  product Page
                                </Text>
                                <RadioButton
                                  label="All Products"
                                  checked={value3 === 'disabled'}
                                  id="disabled"
                                  name="product"
                                  onChange={handleChange3}
                                />
                                <RadioButton
                                  label="Selected products"
                                  id="optional"
                                  name="product"
                                  checked={value3 === 'optional'}
                                  onChange={handleChange3}
                                />
                                <RadioButton
                                  label="Group of products of conditions"
                                  id="optiona2"
                                  name="product"
                                  checked={value3 === 'optiona2'}
                                  onChange={handleChange3}
                                />
                              </div>
                              <hr style={{ margin: "8px 0px 12px 0px", borderColor: "#ececec" }} />
                              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                                <div style={{ display: "flex" }}>
                                  <Text variant="headingMd" as="h1" fontWeight='bold'>
                                    Other Pages
                                  </Text>
                                  <div>
                                    <Icon source={QuestionCircleIcon} tone="base" />
                                  </div>
                                </div>
                                <Checkbox
                                  label="Home page"
                                  checked={checked}
                                  onChange={handleChange4}
                                />
                                <Checkbox
                                  label="Collection Page"
                                  checked={checked1}
                                  onChange={handleChange5}
                                />
                              </div>
                              <hr style={{ margin: "8px 0px 12px 0px", borderColor: "#ececec" }} />
                              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                                <Text variant="headingMd" as="h1" fontWeight='bold'>
                                  Country
                                </Text>
                                <RadioButton
                                  label="Display for all contries"
                                  checked={value4 === 'option1'}
                                  id="option1"
                                  name="country"
                                  onChange={handleChange6}
                                />
                                <RadioButton
                                  label="Display for specific Countries"
                                  id="option2"
                                  name="country"
                                  checked={value4 === 'option2'}
                                  onChange={handleChange6}
                                />
                              </div>
                              <hr style={{ margin: "12px -20px 12px -20px", borderColor: "#ececec" }} />
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <Text variant="headingMd" as="h1" fontWeight='bold'>
                                  Status
                                </Text>
                                <div style={{ display: "none" }}>
                                  <Checkbox
                                    label=""
                                    checked={isChecked2}
                                    onChange={handleToggle2}
                                    ariaDescribedBy="toggle-switch"
                                  />
                                </div>
                                <div
                                  onClick={handleToggle2}
                                  style={{
                                    width: "43px",
                                    height: "25px",
                                    borderRadius: "10px",
                                    backgroundColor: isChecked2 ? "#008060" : "#C4C4C4",
                                    position: "relative",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease-in-out",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      borderRadius: "30%",
                                      backgroundColor: "#fff",
                                      position: "absolute",
                                      top: "49%",
                                      transform: "translateY(-50%)",
                                      left: isChecked2 ? "21px" : "4px",
                                      transition: "left 0.3s ease-in-out",
                                    }}
                                  />
                                </div>
                              </div>
                              <Text variant="bodyLg" as="p">
                                Set a default position for all size charts in  <a href="shopify://admin/settings/general" target="_top">Settings.</a> Toggle "0n" to select a specific position for this chart.
                              </Text>
                            </>
                          )}
                        </LegacyCard.Section>
                      </Tabs>
                      <LegacyCard.Section>
                        <Button submit variant='primary' icon={PlusIcon}>Add New Contant</Button>
        
                      </LegacyCard.Section>
                    </LegacyCard>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
                  <div
              style={{
                maxWidth: '320px',
                margin: '0 auto',
              }}
            >
                <Card>
              <div
              >
                {/* Preview container text and desktop icon */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                  <Text variant="headingXs" as="h6">
                  Preview container
                </Text>
                <div style={{marginLeft:'10px'}}>
                <Icon source={DesktopIcon} color="base" />
                </div>
              </div>
                <Card sectioned>
                  {/* Image and Size Chart Button */}
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        backgroundColor: '#f4f6f8',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        marginBottom: '16px',
                      }}
                    >
                      <Text variant="bodyMd" as="p" color="subdued">
                        Product image
                      </Text>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                      }}
                    >
                      <Button plain icon={<Icon source={MarketsRupeeFilledIcon} />} onClick={toggleModal}>
                Size chart
              </Button>
        
              {active && (
          <Modal
            size="large"
            open={active}
            onClose={toggleModal}
            title="SizeChart"
            primaryAction={{
              content: 'Close',
              onAction: toggleModal,
            }}
          >
            <Modal.Section>
              <TextContainer>
                {selectedPreset && (
                  <>
                    {/* Label instead of Title */}
                    <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>
                      {selectedPreset}
                    </h2>
        
                    {/* Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
                      <thead>
                        <tr>
                        {headers.map((header, index) => (
  <th key={index} style={{ border: "1px solid #ddd", padding: "10px", width: `${100 / headers.length}%` }}>
    <input
      type="text"
      value={header}
      style={{ border: "none", background: "transparent", width: "100%", textAlign: "center" }}
      onChange={(e) => handleHeaderChange(index, e.target.value)}
    />
  </th>
))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
        
                    {/* Image(s) */}
                    {imageUrls?.length > 0 &&
                      imageUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`Preset Image ${idx + 1}`}
                          style={{ width: '100%', maxWidth: '250px', margin: '10px 0', borderRadius: '8px',marginLeft:"250px" }}
                        />
                      ))}
        
                    {/* Subtitle (HTML string) */}
                    <div dangerouslySetInnerHTML={{ __html: value71 }} />
                  </>
                )}
              </TextContainer>
            </Modal.Section>
          </Modal>
        )}
        
        
                    </div>
                  </div>
        
                  {/* Product Details */}
                  <div style={{width:'20px'}}>
                  <SkeletonDisplayText size="small" />
                  </div>
         
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Text variant="headingLg" as="h2">
                      Product name
                    </Text>
                    <Text variant="headingMd" as="h3">
                      $34.99
                    </Text>
                    <SkeletonBodyText lines={2} />
                    {/* Buttons */}
        
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <Button fullWidth>Add to cart</Button>
          <Button fullWidth >
            Checkout now
          </Button>
        </div>
        
                    <SkeletonBodyText />
                  </div>
                </Card>
              </div>
              </Card>
            </div>
                  </Grid.Cell>
                </Grid>
      </form>
      : ''}
      <br />
      <br />
    </Page>
  );
}
