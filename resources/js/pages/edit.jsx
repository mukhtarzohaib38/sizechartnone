// import React from 'react';
import { useLocation } from 'react-router-dom';


// export default function Edit() {
//   const query = new URLSearchParams(useLocation().search);
//   const id = query.get('id'); 

//   return <h1>Muneeb is editing ID: {id}</h1>;
// }
import { Page, Badge, LegacyCard, Tabs, Button, Thumbnail, LegacyStack, Checkbox, Text, Grid, TextField, RadioButton, Icon, Popover, ActionList, DropZone } from '@shopify/polaris';

import {
  QuestionCircleIcon, DragHandleIcon, DeleteIcon,
  PlusIcon,
  MinusIcon,
  NoteIcon
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

  const presets = [
    {
      id: '1',
      label: "Men 1",
      imgSrc: 'https://images.icon-icons.com/1079/PNG/512/mens-shirt_78031.png',
      title: "<h1>Title 1</h1>",
      subtitle: "<h1>Sub Title 1</h1>",
      data: [["S", "10", "20", "30"], ["M", "10", "20", "30"], ["L", "10", "20", "30"],],
      url: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXAIG8w07LR0dSQY3P7W2Fw7hlzSXZbXEcxg&s"
      ]
    },
    {
      id: '2',
      label: "Men 2",
      imgSrc: 'https://images.icon-icons.com/1079/PNG/512/mens-shirt_78031.png',
      title: "<h1>Title 2</h1>",
      subtitle: "<h1>Sub Title 2</h1>",
      data: [["S", "11", "21", "31"], ["M", "11", "21", "31"], ["L", "11", "21", "31"],],
      url: [
        "https://t4.ftcdn.net/jpg/01/43/23/83/240_F_143238306_lh0ap42wgot36y44WybfQpvsJB5A1CHc.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXAIG8w07LR0dSQY3P7W2Fw7hlzSXZbXEcxg&s"
      ]
    },
    {
      id: '3',
      label: "Men 3",
      imgSrc: 'https://images.icon-icons.com/1079/PNG/512/mens-shirt_78031.png',
      title: "<h1>Title 3</h1>",
      subtitle: "<h1>Sub Title 3</h1>",
      data: [["S", "12", "22", "32"], ["M", "12", "22", "32"], ["L", "12", "22", "32"],],
      url: [
        "https://t4.ftcdn.net/jpg/01/43/23/83/240_F_143238306_lh0ap42wgot36y44WybfQpvsJB5A1CHc.jpg"
      ]
    },
    {
      id: '4',
      label: "Men 4",
      imgSrc: 'https://images.icon-icons.com/1079/PNG/512/mens-shirt_78031.png',
      title: "<h1>Title 4</h1>",
      subtitle: "<h1>Sub Title 4</h1>",
      data: [["S", "13", "23", "33"], ["M", "13", "23", "33"], ["L", "13", "23", "33"],],
      url: [
        "https://cdn-icons-png.flaticon.com/512/5511/5511365.png"
      ]
    },
    {
      id: '5',
      label: "Men 5",
      imgSrc: 'https://images.icon-icons.com/1079/PNG/512/mens-shirt_78031.png',
      title: "<h1>Title 5</h1>",
      subtitle: "<h1>Sub Title 5</h1>",
      data: [["S", "14", "24", "34"], ["M", "14", "24", "34"], ["L", "14", "24", "34"],],
      url: [
        "https://t4.ftcdn.net/jpg/01/43/23/83/240_F_143238306_lh0ap42wgot36y44WybfQpvsJB5A1CHc.jpg",
        "https://t4.ftcdn.net/jpg/01/43/23/83/240_F_143238306_lh0ap42wgot36y44WybfQpvsJB5A1CHc.jpg"
      ]
    },
    {
      id: '6',
      label: "Men 6",
      imgSrc: 'https://images.icon-icons.com/1079/PNG/512/mens-shirt_78031.png',
      title: "<h1>Title 6</h1>",
      subtitle: "<h1>Sub Title 6</h1>",
      data: [["S", "15", "25", "35"], ["M", "15", "25", "35"], ["L", "15", "25", "35"],],
      url: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7s8KIPP3Urj3vwubQfCtVKq7YpXqaiWbFCg&s"
      ]
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
  );

  const [value2, setValue2] = useState(pagedata.priority);

  const handleChange2 = useCallback(
    (newValue) => setValue2(newValue),
    [],
  );
  const [isChecked, setIsChecked] = useState(pagedata.status);
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const [isCheckedp1, setIsCheckedp1] = useState(pagedata.storefront);
  const handleTogglep1 = () => {
    setIsCheckedp1(!isCheckedp1);
  };
  const [isChecked2, setIsChecked2] = useState(pagedata.status2);
  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
  };
  const [value3, setValue3] = useState(pagedata.product);

  const handleChange3 = useCallback(
    (_, newValue) => setValue3(newValue),
    [],
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
    const tableData = { headers, data, unit };
    const blob = new Blob([JSON.stringify(tableData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTable = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const { headers: newHeaders, data: newData, unit: newUnit } = JSON.parse(e.target?.result);
          setHeaders(newHeaders);
          setData(newData);
          setUnit(newUnit || "cm");
        } catch (error) {
          alert("Invalid file format");
        }
      };
      reader.readAsText(file);
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
  
    const form = e.target;
    const formData = new FormData(form);
  
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
  
    const url = "/save_chart";
  
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
      shopify.toast.show('Chart Saved!');
      navigate("/");
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };
  
  return (
    <Page
      fullWidth
      backAction={{ content: 'Back', onAction: () => navigate('/') }}
      title={value}
      titleMetadata={isChecked ? <Badge tone='success'>Active</Badge> :<Badge>Draft</Badge>}
    >
      {pageload ?
      <form method="post" onSubmit={handleSubmit}>
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
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <LegacyCard>
              <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} fitted>
                <LegacyCard.Section>
                  {selectedTab === 0 ? (
                    <>
                      <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
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
                                onClick={() => (setSelectedPreset(preset.label), setValue7(preset.title), setData(preset.data), setValue71(preset.subtitle), setImageUrls(preset.url))}
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
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          </Grid.Cell>
        </Grid>
      </form>
      : ''}
      <br />
      <br />
    </Page>
  );
}
