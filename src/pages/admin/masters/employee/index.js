import Layout from '@/components/common/nav/admin/navComponent';
import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import Link from 'next/link'
import { Checkbox } from 'primereact/checkbox';
import { Image } from 'primereact/image';
import { DataTableCustomStyles } from '@/components/helper/dataTable.config';
import createEmployee from './createEmployee';
function employee() {
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);

   const actionBodyTemplate =()=>{
    return(
        <div className='flex gap-2'>
             <Link href={"/admin/masters/employee/createEmployee"}><img
        src="/assets/svg/Edit_Square.svg"
         /></Link> 
         <img
         src="/assets/svg/delete_icon.svg"
          />
        </div>
      
    );
   };
    const parentDataTableColumns = [
        {
            name: 'Employees',
            // selector: row =>  row.employee_name ,

            // !== "" ? row.employee_name : `${row.firstName} ${row.lastName}`,

            selector: row => row.employee_name !== "" ? row.employee_name : `${row.lastName} , ${row.firstName}`,
            // cell: (row) => (
            //     <>
            //         <div className="flex gap-4 items-center">
            //             <Avatar alt="Remy Sharp" src={row.profilePic} />
            //             {row.name}
            //         </div>
            //     </>
            // ),
            width: "200px",
        },
        {
            name: "Employee Code",
            selector: row => row.employee_code,
            sortable: true,
        },
        {
            name: "School",
            selector: row => row.schoolName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <div className="flex gap-8">
                        <Link onClick={(e) => handleEditClick(e, row['id'])} ><EditButton /></Link>
                        <Link onClick={(e) => handleDeleteClick(e, row['id'])} ><DeleteButton /></Link>
                    </div>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            center: true,
            button: true,
        }
    ];

     const ProductService = {
        getProductsData() {
            return [
                {
                    id: '1000',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'bamboo-watch.jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
                {
                    id: '1001',
                    code: 'nvklal433',
                    name: 'Black Watch',
                    description: 'Product Description',
                    image: 'black-watch.jpg',
                    price: 72,
                    category: 'Accessories',
                    quantity: 61,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1002',
                    code: 'zz21cz3c1',
                    name: 'Blue Band',
                    description: 'Product Description',
                    image: 'blue-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 2,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 3
                },
                {
                    id: '1003',
                    code: '244wgerg2',
                    name: 'Blue T-Shirt',
                    description: 'Product Description',
                    image: 'blue-t-shirt.jpg',
                    price: 29,
                    category: 'Clothing',
                    quantity: 25,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
                {
                    id: '1004',
                    code: 'h456wer53',
                    name: 'Bracelet',
                    description: 'Product Description',
                    image: 'bracelet.jpg',
                    price: 15,
                    category: 'Accessories',
                    quantity: 73,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1005',
                    code: 'av2231fwg',
                    name: 'Brown Purse',
                    description: 'Product Description',
                    image: 'brown-purse.jpg',
                    price: 120,
                    category: 'Accessories',
                    quantity: 0,
                    inventoryStatus: 'OUTOFSTOCK',
                    rating: 4
                },
                {
                    id: '1006',
                    code: 'bib36pfvm',
                    name: 'Chakra Bracelet',
                    description: 'Product Description',
                    image: 'chakra-bracelet.jpg',
                    price: 32,
                    category: 'Accessories',
                    quantity: 5,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 3
                },
                {
                    id: '1007',
                    code: 'mbvjkgip5',
                    name: 'Galaxy Earrings',
                    description: 'Product Description',
                    image: 'galaxy-earrings.jpg',
                    price: 34,
                    category: 'Accessories',
                    quantity: 23,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
                {
                    id: '1008',
                    code: 'vbb124btr',
                    name: 'Game Controller',
                    description: 'Product Description',
                    image: 'game-controller.jpg',
                    price: 99,
                    category: 'Electronics',
                    quantity: 2,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 4
                },
                {
                    id: '1009',
                    code: 'cm230f032',
                    name: 'Gaming Set',
                    description: 'Product Description',
                    image: 'gaming-set.jpg',
                    price: 299,
                    category: 'Electronics',
                    quantity: 63,
                    inventoryStatus: 'INSTOCK',
                    rating: 3
                },
                {
                    id: '1010',
                    code: 'plb34234v',
                    name: 'Gold Phone Case',
                    description: 'Product Description',
                    image: 'gold-phone-case.jpg',
                    price: 24,
                    category: 'Accessories',
                    quantity: 0,
                    inventoryStatus: 'OUTOFSTOCK',
                    rating: 4
                },
                {
                    id: '1011',
                    code: '4920nnc2d',
                    name: 'Green Earbuds',
                    description: 'Product Description',
                    image: 'green-earbuds.jpg',
                    price: 89,
                    category: 'Electronics',
                    quantity: 23,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1012',
                    code: '250vm23cc',
                    name: 'Green T-Shirt',
                    description: 'Product Description',
                    image: 'green-t-shirt.jpg',
                    price: 49,
                    category: 'Clothing',
                    quantity: 74,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
                {
                    id: '1013',
                    code: 'fldsmn31b',
                    name: 'Grey T-Shirt',
                    description: 'Product Description',
                    image: 'grey-t-shirt.jpg',
                    price: 48,
                    category: 'Clothing',
                    quantity: 0,
                    inventoryStatus: 'OUTOFSTOCK',
                    rating: 3
                },
                {
                    id: '1014',
                    code: 'waas1x2as',
                    name: 'Headphones',
                    description: 'Product Description',
                    image: 'headphones.jpg',
                    price: 175,
                    category: 'Electronics',
                    quantity: 8,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 5
                },
                {
                    id: '1015',
                    code: 'vb34btbg5',
                    name: 'Light Green T-Shirt',
                    description: 'Product Description',
                    image: 'light-green-t-shirt.jpg',
                    price: 49,
                    category: 'Clothing',
                    quantity: 34,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1016',
                    code: 'k8l6j58jl',
                    name: 'Lime Band',
                    description: 'Product Description',
                    image: 'lime-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 12,
                    inventoryStatus: 'INSTOCK',
                    rating: 3
                },
                {
                    id: '1017',
                    code: 'v435nn85n',
                    name: 'Mini Speakers',
                    description: 'Product Description',
                    image: 'mini-speakers.jpg',
                    price: 85,
                    category: 'Clothing',
                    quantity: 42,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1018',
                    code: '09zx9c0zc',
                    name: 'Painted Phone Case',
                    description: 'Product Description',
                    image: 'painted-phone-case.jpg',
                    price: 56,
                    category: 'Accessories',
                    quantity: 41,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
                {
                    id: '1019',
                    code: 'mnb5mb2m5',
                    name: 'Pink Band',
                    description: 'Product Description',
                    image: 'pink-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 63,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1020',
                    code: 'r23fwf2w3',
                    name: 'Pink Purse',
                    description: 'Product Description',
                    image: 'pink-purse.jpg',
                    price: 110,
                    category: 'Accessories',
                    quantity: 0,
                    inventoryStatus: 'OUTOFSTOCK',
                    rating: 4
                },
                {
                    id: '1021',
                    code: 'pxpzczo23',
                    name: 'Purple Band',
                    description: 'Product Description',
                    image: 'purple-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 6,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 3
                },
                {
                    id: '1022',
                    code: '2c42cb5cb',
                    name: 'Purple Gemstone Necklace',
                    description: 'Product Description',
                    image: 'purple-gemstone-necklace.jpg',
                    price: 45,
                    category: 'Accessories',
                    quantity: 62,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1023',
                    code: '5k43kkk23',
                    name: 'Purple T-Shirt',
                    description: 'Product Description',
                    image: 'purple-t-shirt.jpg',
                    price: 49,
                    category: 'Clothing',
                    quantity: 2,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 5
                },
                {
                    id: '1024',
                    code: 'lm2tny2k4',
                    name: 'Shoes',
                    description: 'Product Description',
                    image: 'shoes.jpg',
                    price: 64,
                    category: 'Clothing',
                    quantity: 0,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1025',
                    code: 'nbm5mv45n',
                    name: 'Sneakers',
                    description: 'Product Description',
                    image: 'sneakers.jpg',
                    price: 78,
                    category: 'Clothing',
                    quantity: 52,
                    inventoryStatus: 'INSTOCK',
                    rating: 4
                },
                {
                    id: '1026',
                    code: 'zx23zc42c',
                    name: 'Teal T-Shirt',
                    description: 'Product Description',
                    image: 'teal-t-shirt.jpg',
                    price: 49,
                    category: 'Clothing',
                    quantity: 3,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 3
                },
                {
                    id: '1027',
                    code: 'acvx872gc',
                    name: 'Yellow Earbuds',
                    description: 'Product Description',
                    image: 'yellow-earbuds.jpg',
                    price: 89,
                    category: 'Electronics',
                    quantity: 35,
                    inventoryStatus: 'INSTOCK',
                    rating: 3
                },
                {
                    id: '1028',
                    code: 'tx125ck42',
                    name: 'Yoga Mat',
                    description: 'Product Description',
                    image: 'yoga-mat.jpg',
                    price: 20,
                    category: 'Fitness',
                    quantity: 15,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
                {
                    id: '1029',
                    code: 'gwuby345v',
                    name: 'Yoga Set',
                    description: 'Product Description',
                    image: 'yoga-set.jpg',
                    price: 20,
                    category: 'Fitness',
                    quantity: 25,
                    inventoryStatus: 'INSTOCK',
                    rating: 8
                }
            ];
        },

        getProductsWithOrdersData() {
            return [
                {
                    id: '1000',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'bamboo-watch.jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    inventoryStatus: 'INSTOCK',
                    rating: 5,
                    orders: [
                        {
                            id: '1000-0',
                            productCode: 'f230fh0g3',
                            date: '2020-09-13',
                            amount: 65,
                            quantity: 1,
                            customer: 'David James',
                            status: 'PENDING'
                        },
                        {
                            id: '1000-1',
                            productCode: 'f230fh0g3',
                            date: '2020-05-14',
                            amount: 130,
                            quantity: 2,
                            customer: 'Leon Rodrigues',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1000-2',
                            productCode: 'f230fh0g3',
                            date: '2019-01-04',
                            amount: 65,
                            quantity: 1,
                            customer: 'Juan Alejandro',
                            status: 'RETURNED'
                        },
                        {
                            id: '1000-3',
                            productCode: 'f230fh0g3',
                            date: '2020-09-13',
                            amount: 195,
                            quantity: 3,
                            customer: 'Claire Morrow',
                            status: 'CANCELLED'
                        }
                    ]
                },
                {
                    id: '1001',
                    code: 'nvklal433',
                    name: 'Black Watch',
                    description: 'Product Description',
                    image: 'black-watch.jpg',
                    price: 72,
                    category: 'Accessories',
                    quantity: 61,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1001-0',
                            productCode: 'nvklal433',
                            date: '2020-05-14',
                            amount: 72,
                            quantity: 1,
                            customer: 'Maisha Jefferson',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1001-1',
                            productCode: 'nvklal433',
                            date: '2020-02-28',
                            amount: 144,
                            quantity: 2,
                            customer: 'Octavia Murillo',
                            status: 'PENDING'
                        }
                    ]
                },
                {
                    id: '1002',
                    code: 'zz21cz3c1',
                    name: 'Blue Band',
                    description: 'Product Description',
                    image: 'blue-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 2,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 3,
                    orders: [
                        {
                            id: '1002-0',
                            productCode: 'zz21cz3c1',
                            date: '2020-07-05',
                            amount: 79,
                            quantity: 1,
                            customer: 'Stacey Leja',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1002-1',
                            productCode: 'zz21cz3c1',
                            date: '2020-02-06',
                            amount: 79,
                            quantity: 1,
                            customer: 'Ashley Wickens',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1003',
                    code: '244wgerg2',
                    name: 'Blue T-Shirt',
                    description: 'Product Description',
                    image: 'blue-t-shirt.jpg',
                    price: 29,
                    category: 'Clothing',
                    quantity: 25,
                    inventoryStatus: 'INSTOCK',
                    rating: 5,
                    orders: []
                },
                {
                    id: '1004',
                    code: 'h456wer53',
                    name: 'Bracelet',
                    description: 'Product Description',
                    image: 'bracelet.jpg',
                    price: 15,
                    category: 'Accessories',
                    quantity: 73,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1004-0',
                            productCode: 'h456wer53',
                            date: '2020-09-05',
                            amount: 60,
                            quantity: 4,
                            customer: 'Mayumi Misaki',
                            status: 'PENDING'
                        },
                        {
                            id: '1004-1',
                            productCode: 'h456wer53',
                            date: '2019-04-16',
                            amount: 2,
                            quantity: 30,
                            customer: 'Francesco Salvatore',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1005',
                    code: 'av2231fwg',
                    name: 'Brown Purse',
                    description: 'Product Description',
                    image: 'brown-purse.jpg',
                    price: 120,
                    category: 'Accessories',
                    quantity: 0,
                    inventoryStatus: 'OUTOFSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1005-0',
                            productCode: 'av2231fwg',
                            date: '2020-01-25',
                            amount: 120,
                            quantity: 1,
                            customer: 'Isabel Sinclair',
                            status: 'RETURNED'
                        },
                        {
                            id: '1005-1',
                            productCode: 'av2231fwg',
                            date: '2019-03-12',
                            amount: 240,
                            quantity: 2,
                            customer: 'Lionel Clifford',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1005-2',
                            productCode: 'av2231fwg',
                            date: '2019-05-05',
                            amount: 120,
                            quantity: 1,
                            customer: 'Cody Chavez',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1006',
                    code: 'bib36pfvm',
                    name: 'Chakra Bracelet',
                    description: 'Product Description',
                    image: 'chakra-bracelet.jpg',
                    price: 32,
                    category: 'Accessories',
                    quantity: 5,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 3,
                    orders: [
                        {
                            id: '1006-0',
                            productCode: 'bib36pfvm',
                            date: '2020-02-24',
                            amount: 32,
                            quantity: 1,
                            customer: 'Arvin Darci',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1006-1',
                            productCode: 'bib36pfvm',
                            date: '2020-01-14',
                            amount: 64,
                            quantity: 2,
                            customer: 'Izzy Jones',
                            status: 'PENDING'
                        }
                    ]
                },
                {
                    id: '1007',
                    code: 'mbvjkgip5',
                    name: 'Galaxy Earrings',
                    description: 'Product Description',
                    image: 'galaxy-earrings.jpg',
                    price: 34,
                    category: 'Accessories',
                    quantity: 23,
                    inventoryStatus: 'INSTOCK',
                    rating: 5,
                    orders: [
                        {
                            id: '1007-0',
                            productCode: 'mbvjkgip5',
                            date: '2020-06-19',
                            amount: 34,
                            quantity: 1,
                            customer: 'Jennifer Smith',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1008',
                    code: 'vbb124btr',
                    name: 'Game Controller',
                    description: 'Product Description',
                    image: 'game-controller.jpg',
                    price: 99,
                    category: 'Electronics',
                    quantity: 2,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1008-0',
                            productCode: 'vbb124btr',
                            date: '2020-01-05',
                            amount: 99,
                            quantity: 1,
                            customer: 'Jeanfrancois David',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1008-1',
                            productCode: 'vbb124btr',
                            date: '2020-01-19',
                            amount: 198,
                            quantity: 2,
                            customer: 'Ivar Greenwood',
                            status: 'RETURNED'
                        }
                    ]
                },
                {
                    id: '1009',
                    code: 'cm230f032',
                    name: 'Gaming Set',
                    description: 'Product Description',
                    image: 'gaming-set.jpg',
                    price: 299,
                    category: 'Electronics',
                    quantity: 63,
                    inventoryStatus: 'INSTOCK',
                    rating: 3,
                    orders: [
                        {
                            id: '1009-0',
                            productCode: 'cm230f032',
                            date: '2020-06-24',
                            amount: 299,
                            quantity: 1,
                            customer: 'Kadeem Mujtaba',
                            status: 'PENDING'
                        },
                        {
                            id: '1009-1',
                            productCode: 'cm230f032',
                            date: '2020-05-11',
                            amount: 299,
                            quantity: 1,
                            customer: 'Ashley Wickens',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1009-2',
                            productCode: 'cm230f032',
                            date: '2019-02-07',
                            amount: 299,
                            quantity: 1,
                            customer: 'Julie Johnson',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1009-3',
                            productCode: 'cm230f032',
                            date: '2020-04-26',
                            amount: 299,
                            quantity: 1,
                            customer: 'Tony Costa',
                            status: 'CANCELLED'
                        }
                    ]
                },
                {
                    id: '1010',
                    code: 'plb34234v',
                    name: 'Gold Phone Case',
                    description: 'Product Description',
                    image: 'gold-phone-case.jpg',
                    price: 24,
                    category: 'Accessories',
                    quantity: 0,
                    inventoryStatus: 'OUTOFSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1010-0',
                            productCode: 'plb34234v',
                            date: '2020-02-04',
                            amount: 24,
                            quantity: 1,
                            customer: 'James Butt',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1010-1',
                            productCode: 'plb34234v',
                            date: '2020-05-05',
                            amount: 48,
                            quantity: 2,
                            customer: 'Josephine Darakjy',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1011',
                    code: '4920nnc2d',
                    name: 'Green Earbuds',
                    description: 'Product Description',
                    image: 'green-earbuds.jpg',
                    price: 89,
                    category: 'Electronics',
                    quantity: 23,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1011-0',
                            productCode: '4920nnc2d',
                            date: '2020-06-01',
                            amount: 89,
                            quantity: 1,
                            customer: 'Art Venere',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1012',
                    code: '250vm23cc',
                    name: 'Green T-Shirt',
                    description: 'Product Description',
                    image: 'green-t-shirt.jpg',
                    price: 49,
                    category: 'Clothing',
                    quantity: 74,
                    inventoryStatus: 'INSTOCK',
                    rating: 5,
                    orders: [
                        {
                            id: '1012-0',
                            productCode: '250vm23cc',
                            date: '2020-02-05',
                            amount: 49,
                            quantity: 1,
                            customer: 'Lenna Paprocki',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1012-1',
                            productCode: '250vm23cc',
                            date: '2020-02-15',
                            amount: 49,
                            quantity: 1,
                            customer: 'Donette Foller',
                            status: 'PENDING'
                        }
                    ]
                },
                {
                    id: '1013',
                    code: 'fldsmn31b',
                    name: 'Grey T-Shirt',
                    description: 'Product Description',
                    image: 'grey-t-shirt.jpg',
                    price: 48,
                    category: 'Clothing',
                    quantity: 0,
                    inventoryStatus: 'OUTOFSTOCK',
                    rating: 3,
                    orders: [
                        {
                            id: '1013-0',
                            productCode: 'fldsmn31b',
                            date: '2020-04-01',
                            amount: 48,
                            quantity: 1,
                            customer: 'Simona Morasca',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1014',
                    code: 'waas1x2as',
                    name: 'Headphones',
                    description: 'Product Description',
                    image: 'headphones.jpg',
                    price: 175,
                    category: 'Electronics',
                    quantity: 8,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 5,
                    orders: [
                        {
                            id: '1014-0',
                            productCode: 'waas1x2as',
                            date: '2020-05-15',
                            amount: 175,
                            quantity: 1,
                            customer: 'Lenna Paprocki',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1014-1',
                            productCode: 'waas1x2as',
                            date: '2020-01-02',
                            amount: 175,
                            quantity: 1,
                            customer: 'Donette Foller',
                            status: 'CANCELLED'
                        }
                    ]
                },
                {
                    id: '1015',
                    code: 'vb34btbg5',
                    name: 'Light Green T-Shirt',
                    description: 'Product Description',
                    image: 'light-green-t-shirt.jpg',
                    price: 49,
                    category: 'Clothing',
                    quantity: 34,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1015-0',
                            productCode: 'vb34btbg5',
                            date: '2020-07-02',
                            amount: 98,
                            quantity: 2,
                            customer: 'Mitsue Tollner',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1016',
                    code: 'k8l6j58jl',
                    name: 'Lime Band',
                    description: 'Product Description',
                    image: 'lime-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 12,
                    inventoryStatus: 'INSTOCK',
                    rating: 3,
                    orders: []
                },
                {
                    id: '1017',
                    code: 'v435nn85n',
                    name: 'Mini Speakers',
                    description: 'Product Description',
                    image: 'mini-speakers.jpg',
                    price: 85,
                    category: 'Clothing',
                    quantity: 42,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1017-0',
                            productCode: 'v435nn85n',
                            date: '2020-07-12',
                            amount: 85,
                            quantity: 1,
                            customer: 'Minna Amigon',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1018',
                    code: '09zx9c0zc',
                    name: 'Painted Phone Case',
                    description: 'Product Description',
                    image: 'painted-phone-case.jpg',
                    price: 56,
                    category: 'Accessories',
                    quantity: 41,
                    inventoryStatus: 'INSTOCK',
                    rating: 5,
                    orders: [
                        {
                            id: '1018-0',
                            productCode: '09zx9c0zc',
                            date: '2020-07-01',
                            amount: 56,
                            quantity: 1,
                            customer: 'Abel Maclead',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1018-1',
                            productCode: '09zx9c0zc',
                            date: '2020-05-02',
                            amount: 56,
                            quantity: 1,
                            customer: 'Minna Amigon',
                            status: 'RETURNED'
                        }
                    ]
                },
                {
                    id: '1019',
                    code: 'mnb5mb2m5',
                    name: 'Pink Band',
                    description: 'Product Description',
                    image: 'pink-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 63,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: []
                },
                {
                    id: '1020',
                    code: 'r23fwf2w3',
                    name: 'Pink Purse',
                    description: 'Product Description',
                    image: 'pink-purse.jpg',
                    price: 110,
                    category: 'Accessories',
                    quantity: 0,
                    inventoryStatus: 'OUTOFSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1020-0',
                            productCode: 'r23fwf2w3',
                            date: '2020-05-29',
                            amount: 110,
                            quantity: 1,
                            customer: 'Kiley Caldarera',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1020-1',
                            productCode: 'r23fwf2w3',
                            date: '2020-02-11',
                            amount: 220,
                            quantity: 2,
                            customer: 'Graciela Ruta',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1021',
                    code: 'pxpzczo23',
                    name: 'Purple Band',
                    description: 'Product Description',
                    image: 'purple-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 6,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 3,
                    orders: [
                        {
                            id: '1021-0',
                            productCode: 'pxpzczo23',
                            date: '2020-02-02',
                            amount: 79,
                            quantity: 1,
                            customer: 'Cammy Albares',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1022',
                    code: '2c42cb5cb',
                    name: 'Purple Gemstone Necklace',
                    description: 'Product Description',
                    image: 'purple-gemstone-necklace.jpg',
                    price: 45,
                    category: 'Accessories',
                    quantity: 62,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1022-0',
                            productCode: '2c42cb5cb',
                            date: '2020-06-29',
                            amount: 45,
                            quantity: 1,
                            customer: 'Mattie Poquette',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1022-1',
                            productCode: '2c42cb5cb',
                            date: '2020-02-11',
                            amount: 135,
                            quantity: 3,
                            customer: 'Meaghan Garufi',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1023',
                    code: '5k43kkk23',
                    name: 'Purple T-Shirt',
                    description: 'Product Description',
                    image: 'purple-t-shirt.jpg',
                    price: 49,
                    category: 'Clothing',
                    quantity: 2,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 5,
                    orders: [
                        {
                            id: '1023-0',
                            productCode: '5k43kkk23',
                            date: '2020-04-15',
                            amount: 49,
                            quantity: 1,
                            customer: 'Gladys Rim',
                            status: 'RETURNED'
                        }
                    ]
                },
                {
                    id: '1024',
                    code: 'lm2tny2k4',
                    name: 'Shoes',
                    description: 'Product Description',
                    image: 'shoes.jpg',
                    price: 64,
                    category: 'Clothing',
                    quantity: 0,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: []
                },
                {
                    id: '1025',
                    code: 'nbm5mv45n',
                    name: 'Sneakers',
                    description: 'Product Description',
                    image: 'sneakers.jpg',
                    price: 78,
                    category: 'Clothing',
                    quantity: 52,
                    inventoryStatus: 'INSTOCK',
                    rating: 4,
                    orders: [
                        {
                            id: '1025-0',
                            productCode: 'nbm5mv45n',
                            date: '2020-02-19',
                            amount: 78,
                            quantity: 1,
                            customer: 'Yuki Whobrey',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1025-1',
                            productCode: 'nbm5mv45n',
                            date: '2020-05-21',
                            amount: 78,
                            quantity: 1,
                            customer: 'Fletcher Flosi',
                            status: 'PENDING'
                        }
                    ]
                },
                {
                    id: '1026',
                    code: 'zx23zc42c',
                    name: 'Teal T-Shirt',
                    description: 'Product Description',
                    image: 'teal-t-shirt.jpg',
                    price: 49,
                    category: 'Clothing',
                    quantity: 3,
                    inventoryStatus: 'LOWSTOCK',
                    rating: 3,
                    orders: [
                        {
                            id: '1026-0',
                            productCode: 'zx23zc42c',
                            date: '2020-04-24',
                            amount: 98,
                            quantity: 2,
                            customer: 'Bette Nicka',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1027',
                    code: 'acvx872gc',
                    name: 'Yellow Earbuds',
                    description: 'Product Description',
                    image: 'yellow-earbuds.jpg',
                    price: 89,
                    category: 'Electronics',
                    quantity: 35,
                    inventoryStatus: 'INSTOCK',
                    rating: 3,
                    orders: [
                        {
                            id: '1027-0',
                            productCode: 'acvx872gc',
                            date: '2020-01-29',
                            amount: 89,
                            quantity: 1,
                            customer: 'Veronika Inouye',
                            status: 'DELIVERED'
                        },
                        {
                            id: '1027-1',
                            productCode: 'acvx872gc',
                            date: '2020-06-11',
                            amount: 89,
                            quantity: 1,
                            customer: 'Willard Kolmetz',
                            status: 'DELIVERED'
                        }
                    ]
                },
                {
                    id: '1028',
                    code: 'tx125ck42',
                    name: 'Yoga Mat',
                    description: 'Product Description',
                    image: 'yoga-mat.jpg',
                    price: 20,
                    category: 'Fitness',
                    quantity: 15,
                    inventoryStatus: 'INSTOCK',
                    rating: 5,
                    orders: []
                },
                {
                    id: '1029',
                    code: 'gwuby345v',
                    name: 'Yoga Set',
                    description: 'Product Description',
                    image: 'yoga-set.jpg',
                    price: 20,
                    category: 'Fitness',
                    quantity: 25,
                    inventoryStatus: 'INSTOCK',
                    rating: 8,
                    orders: [
                        {
                            id: '1029-0',
                            productCode: 'gwuby345v',
                            date: '2020-02-14',
                            amount: 4,
                            quantity: 80,
                            customer: 'Maryann Royster',
                            status: 'DELIVERED'
                        }
                    ]
                }
            ];
        },

        getProductsMini() {
            return Promise.resolve(this.getProductsData().slice(0, 5));
        },

        getProductsSmall() {
            return Promise.resolve(this.getProductsData().slice(0, 10));
        },

        getProducts() {
            return Promise.resolve(this.getProductsData());
        },

        getProductsWithOrdersSmall() {
            return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
        },

        getProductsWithOrders() {
            return Promise.resolve(this.getProductsWithOrdersData());
        }
    };

    async function previewEmployee() {

        // Import code needs to optimize
        const appIdData = Apps;

        if (fileObj === '') {
            toast.error('Please select file.');
            return;
        }

        if (fileObj.size === 0) {
            toast.error('Do not select empty file.');
        } else {
            ExcelRenderer(fileObj, async (err, resp) => {
                if (err) {
                }
                else {

                    var parameterData = resp.rows
                    var newParameterArray = parameterData.slice(1);
                    let employeeListData = [...allEmployees]

                    for (let i = 0; i < newParameterArray.length; i++) {
                        var csvSchoolCode = newParameterArray[i][0];
                        var csvFirstName = newParameterArray[i][1];
                        var csvLastName = newParameterArray[i][2];
                        var csvEmployeeId = newParameterArray[i][3];
                        var csvReportingManagerEmail = newParameterArray[i][4];
                        var csvPhoneNumber = newParameterArray[i][5];
                        var csvEmail = newParameterArray[i][6];
                        var csvUserType = newParameterArray[i][7];
                        var csvAddress1 = newParameterArray[i][8];
                        var csvAddress2 = newParameterArray[i][9];
                        var csvCity = newParameterArray[i][10];
                        var csvZipCode = newParameterArray[i][11];
                        var csvCountry = newParameterArray[i][12];
                        var csvState = newParameterArray[i][13];

                        // New fields for only cognito
                        var csvRole = newParameterArray[i][14];
                        var isSixPeriodSAdmin = newParameterArray[i][15];
                        var sixPeriodIsInitiator = newParameterArray[i][16];
                        var sixPeriodIsApprover = newParameterArray[i][17];
                        var sixPeriodIsPayroll = newParameterArray[i][18];
                        /* var ispersonnelIsAdmin = newParameterArray[i][14];
                        var personnelIsInitiator = newParameterArray[i][15];
                        var personnelIsApprover = newParameterArray[i][16];
                        var personnelIsPayroll = newParameterArray[i][17]; */
                        var certiSubRIsInitiator = newParameterArray[i][19];
                        var certiSubReIsApprover = newParameterArray[i][20];
                        var certiSubReqIsPayroll = newParameterArray[i][21];

                        // New fields for amplify database
                        var WEEKLY_ABSENCE_REPORT = newParameterArray[i][22];
                        var WEEKLY_ABSENCE_REPORT_ADMIN = newParameterArray[i][23];
                        var TIME_REPORT = newParameterArray[i][24];
                        var SIX_PERIOD = newParameterArray[i][25];
                        var CLASSIFIED_SUB_REQUEST = newParameterArray[i][26];
                        var SUBSTITUTE_REQUEST_CERTIFICATED = newParameterArray[i][27];
                        var STIPENDS_FORM = newParameterArray[i][28];
                        var PERSONAL_SERVICE_AGREEMENT = newParameterArray[i][29];
                        var EMPLOYEE_HAND_BOOK = newParameterArray[i][30];
                        var PERSONNEL_ACTION_FORM = newParameterArray[i][31];

                        // Last two fields
                        var userPermission = newParameterArray[i][32];
                        var csvDesignation = newParameterArray[i][33];
                        var timeRIsInitiator = newParameterArray[i][34];
                        var timeRIsApprover = newParameterArray[i][35];
                        var timeRIsPayroll = newParameterArray[i][36];
                        var timeRIsSuperadmin = newParameterArray[i][37];

                        // var L1_authoritys = newParameterArray[i][37];
                        // var L2_authoritys = newParameterArray[i][38];

                        //For Stipend data saved in userAdditionalSettings table
                        var stipendInitiator = newParameterArray[i][38];
                        var stipendApprover = newParameterArray[i][39];
                        var stipendPayroll = newParameterArray[i][40];

                        var subReqClassifiedInitiator = newParameterArray[i][41];
                        var subReqClassifiedApprover = newParameterArray[i][42];
                        var subReqClassifiedPayroll = newParameterArray[i][43];
                        var personnelServiceAgreeInitiator = newParameterArray[i][44];
                        var personnelServiceAgreeApprover = newParameterArray[i][45];
                        var personnelServiceAgreePayroll = newParameterArray[i][46];

                        // COGNITO ONLY
                        var personnelIsApprover = newParameterArray[i][47];
                        var personnelIsInitiator = newParameterArray[i][48];
                        var personnelIsPayroll = newParameterArray[i][49];
                        var ispersonnelIsAdmin = newParameterArray[i][50];
                        let strike = 0;

                        let existingEmployee = employeeListData.filter(item => item.email === csvEmail);
                        let managerDetails = employeeListData.find(o => o.email === csvReportingManagerEmail);
                        let schoolDetails = allSchools.find(o => o.name.toUpperCase() === csvSchoolCode.toUpperCase());

                        var csvEmployeeName = capitalizeFirstChar(csvLastName) + ', ' + csvFirstName.toUpperCase();

                        if (!csvEmployeeName || !csvEmployeeId || !csvEmail || existingEmployee.length > 0) {
                            strike = 1;
                            if (existingEmployee.length > 0) { 
                                strike = 2;
                            }
                        }

                        if (existingEmployee.length > 0 && userPermission === 1) {


                            const cognito = new AWS.CognitoIdentityServiceProvider();

                            if (existingEmployee[0].user_Id) {
                                const params = {
                                    UserPoolId: awsmobile.aws_user_pools_id,
                                    Username: existingEmployee[0].user_Id,
                                    UserAttributes: [
                                        {
                                            Name: "name",
                                            Value: (csvEmployeeName) ? csvEmployeeName : '',
                                        },
                                        {
                                            Name: "custom:firstName",
                                            Value: (csvFirstName) ? csvFirstName.toUpperCase() : '',
                                        },
                                        {
                                            Name: "custom:lastName",
                                            Value: (csvLastName) ? capitalizeFirstChar(csvLastName) : '',
                                        },
                                        {
                                            Name: "custom:personnelIsApprover",
                                            Value: (personnelIsApprover) ? personnelIsApprover.toString() : '0',
                                        },
                                        {
                                            Name: "custom:personnelIsInitiator",
                                            Value: (personnelIsInitiator) ? personnelIsInitiator.toString() : '0',
                                        },
                                        {
                                            Name: "custom:personnelIsPayroll",
                                            Value: (personnelIsPayroll) ? personnelIsPayroll.toString() : '0',
                                        },
                                        {
                                            Name: "custom:ispersonnelIsAdmin",
                                            Value: (ispersonnelIsAdmin) ? ispersonnelIsAdmin.toString() : '0',
                                        },
                                        {
                                            Name: "custom:role",
                                            Value: (csvRole) ? csvRole : '',
                                        },
                                        {
                                            Name: "custom:city",
                                            Value: csvCity,
                                        },
                                        {
                                            Name: "custom:mobileNumber",
                                            Value: csvPhoneNumber.toString(),
                                        },
                                        {
                                            Name: "custom:address",
                                            Value: csvAddress1,
                                        },
                                        {
                                            Name: "custom:userCode",
                                            Value: csvEmployeeId.toString(),
                                        },
                                        {
                                            Name: "custom:reportingManagerId",
                                            Value: managerDetails ? managerDetails.user_Id : '',
                                        },
                                        {
                                            Name: "custom:isSixPeriodSAdmin",
                                            Value: isSixPeriodSAdmin.toString(),
                                        },
                                        {
                                            Name: "custom:sixPeriodIsInitiator",
                                            Value: sixPeriodIsInitiator.toString(),
                                        },
                                        {
                                            Name: "custom:sixPeriodIsApprover",
                                            Value: sixPeriodIsApprover.toString(),
                                        },
                                        {
                                            Name: "custom:sixPeriodIsPayroll",
                                            Value: sixPeriodIsPayroll.toString(),
                                        },
                                        {
                                            Name: "custom:certiSubRIsInitiator",
                                            Value: certiSubRIsInitiator.toString(),
                                        },
                                        {
                                            Name: "custom:certiSubReIsApprover",
                                            Value: certiSubReIsApprover.toString(),
                                        },
                                        {
                                            Name: "custom:certiSubReqIsPayroll",
                                            Value: certiSubReqIsPayroll.toString(),
                                        },
                                        {
                                            Name: "custom:timeRIsInitiator",
                                            Value: timeRIsInitiator.toString() === '1' ? '1' : '0',
                                        },
                                        {
                                            Name: "custom:timeRIsApprover",
                                            Value: timeRIsApprover.toString() === '1' ? '1' : '0',
                                        },
                                        {
                                            Name: "custom:timeRIsPayroll",
                                            Value: timeRIsPayroll.toString() === '1' ? '1' : '0',
                                        },
                                        {
                                            Name: "custom:timeRIsSAdmin",
                                            Value: timeRIsSuperadmin.toString() === '1' ? '1' : '0',
                                        },
                                    ],
                                };
                                try {
                                    cognito.adminUpdateUserAttributes(params, function (err, data) {
                                        if (err){
                                            console.log("Errr rr", err, err.stack);
                                        }
                                        else{
                                            console.log(data);
                                        }
                                    });
                                } catch (error) {
                                    console.error('Error updating cognito user attribute:', error);
                                }
                            }
                            else {


                                // Find cognito user by email and get sub to update employee user_Id

                                try {
                                    const cognito = new AWS.CognitoIdentityServiceProvider();

                                    var params =
                                    {
                                        UserPoolId: awsmobile.aws_user_pools_id,
                                        Limit: 60,
                                        "Filter": "email ^= \"" + existingEmployee[0].email + "\""
                                    };

                                    let cognitoUserList = await cognito.listUsers(params, async (err, data) => {
                                        if (err) {
                                            // return '';
                                            //(err.message);
                                        } else {
                                            var sub = "";
                                            data.Users.forEach(async (user, i) => {
                                                sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;

                                                await updateUserSUB(sub, existingEmployee[0].id,csvRole)

                                                // Update Cognito


                                                // "custom:firstName": csvFirstName,
                                                // "custom:lastName": csvLastName,
                                                // "custom:role": csvRole,
                                                // "name": csvEmployeeName,
                                                // "custom:city": csvCity,
                                                // "custom:mobileNumber": csvPhoneNumber.toString(),
                                                // "custom:address": csvAddress1,
                                                // "custom:userCode": csvEmployeeId.toString(),
                                                // "custom:reportingManagerId": managerDetails ? managerDetails.user_Id : '',
                                                // "custom:isSixPeriodSAdmin": isSixPeriodSAdmin.toString(),
                                                // "custom:sixPeriodIsInitiator": sixPeriodIsInitiator.toString(),
                                                // "custom:sixPeriodIsApprover": sixPeriodIsApprover.toString(),
                                                // "custom:sixPeriodIsPayroll": sixPeriodIsPayroll.toString(),
                                                // "custom:certiSubRIsInitiator": certiSubRIsInitiator.toString(),
                                                // "custom:certiSubReIsApprover": certiSubReIsApprover.toString(),
                                                // "custom:certiSubReqIsPayroll": certiSubReqIsPayroll.toString(),
                                                // "custom:timeRIsInitiator": timeRIsInitiator === '1' ? timeRIsInitiator : '0',
                                                // "custom:timeRIsApprover": timeRIsApprover === '1' ? timeRIsApprover : '0',
                                                // "custom:timeRIsPayroll": timeRIsPayroll === '1' ? timeRIsPayroll : '0',
                                                // "custom:timeRIsSAdmin": timeRIsSuperadmin === '1' ? timeRIsSuperadmin : '0',


                                                const params = {
                                                    UserPoolId: awsmobile.aws_user_pools_id,
                                                    Username: sub,
                                                    UserAttributes: [
                                                        {
                                                            Name: "name",
                                                            Value: (csvEmployeeName) ? csvEmployeeName : '',
                                                        },
                                                        {
                                                            Name: "custom:firstName",
                                                            Value: (csvFirstName) ? csvFirstName.toUpperCase() : '',
                                                        },
                                                        {
                                                            Name: "custom:lastName",
                                                            Value: (csvLastName) ? capitalizeFirstChar(csvLastName) : '',
                                                        },
                                                        {
                                                            Name: "custom:personnelIsApprover",
                                                            Value: (personnelIsApprover) ? personnelIsApprover.toString() : '0',
                                                        },
                                                        {
                                                            Name: "custom:personnelIsInitiator",
                                                            Value: (personnelIsInitiator) ? personnelIsInitiator.toString() : '0',
                                                        },
                                                        {
                                                            Name: "custom:personnelIsPayroll",
                                                            Value: (personnelIsPayroll) ? personnelIsPayroll.toString() : '0',
                                                        },
                                                        {
                                                            Name: "custom:ispersonnelIsAdmin",
                                                            Value: (ispersonnelIsAdmin) ? ispersonnelIsAdmin.toString() : '0',
                                                        },
                                                        {
                                                            Name: "custom:role",
                                                            Value: (csvRole) ? csvRole : '',
                                                        },
                                                        {
                                                            Name: "custom:city",
                                                            Value: csvCity,
                                                        },
                                                        {
                                                            Name: "custom:mobileNumber",
                                                            Value: csvPhoneNumber.toString(),
                                                        },
                                                        {
                                                            Name: "custom:address",
                                                            Value: csvAddress1,
                                                        },
                                                        {
                                                            Name: "custom:userCode",
                                                            Value: csvEmployeeId.toString(),
                                                        },
                                                        {
                                                            Name: "custom:reportingManagerId",
                                                            Value: managerDetails ? managerDetails.user_Id : '',
                                                        },
                                                        {
                                                            Name: "custom:isSixPeriodSAdmin",
                                                            Value: isSixPeriodSAdmin.toString(),
                                                        },
                                                        {
                                                            Name: "custom:sixPeriodIsInitiator",
                                                            Value: sixPeriodIsInitiator.toString(),
                                                        },
                                                        {
                                                            Name: "custom:sixPeriodIsApprover",
                                                            Value: sixPeriodIsApprover.toString(),
                                                        },
                                                        {
                                                            Name: "custom:sixPeriodIsPayroll",
                                                            Value: sixPeriodIsPayroll.toString(),
                                                        },
                                                        {
                                                            Name: "custom:certiSubRIsInitiator",
                                                            Value: certiSubRIsInitiator.toString(),
                                                        },
                                                        {
                                                            Name: "custom:certiSubReIsApprover",
                                                            Value: certiSubReIsApprover.toString(),
                                                        },
                                                        {
                                                            Name: "custom:certiSubReqIsPayroll",
                                                            Value: certiSubReqIsPayroll.toString(),
                                                        },
                                                        {
                                                            Name: "custom:timeRIsInitiator",
                                                            Value: timeRIsInitiator.toString() === '1' ? '1' : '0',
                                                        },
                                                        {
                                                            Name: "custom:timeRIsApprover",
                                                            Value: timeRIsApprover.toString() === '1' ? '1' : '0',
                                                        },
                                                        {
                                                            Name: "custom:timeRIsPayroll",
                                                            Value: timeRIsPayroll.toString() === '1' ? '1' : '0',
                                                        },
                                                        {
                                                            Name: "custom:timeRIsSAdmin",
                                                            Value: timeRIsSuperadmin.toString() === '1' ? '1' : '0',
                                                        },
                                                    ],
                                                };

                                                try {
                                                    cognito.adminUpdateUserAttributes(params, function (err, data) {
                                                        if (err){
                                                            console.log("Errr rr", err, err.stack);
                                                        }
                                                        else{
                                                            console.log(data);
                                                        }
                                                    });
                                                } catch (error) {
                                                    console.error('Error updating user attribute:', error);
                                                }
                                            })
                                        }

                                        if (!data.Users.length) {

                                            // Create cognitouser
                                            let userCreated = await Auth.signUp({
                                                username: csvEmail,
                                                password: 'Gusd@2023',
                                                attributes: {
                                                    email: csvEmail,
                                                    name: csvEmployeeName,
                                                    "custom:firstName": csvFirstName.toUpperCase(),
                                                    "custom:lastName": capitalizeFirstChar(csvLastName),
                                                    "custom:role": csvRole,
                                                    "name": csvEmployeeName,
                                                    "custom:city": csvCity,
                                                    "custom:gender": '',
                                                    "custom:mobileNumber": csvPhoneNumber.toString(),
                                                    "custom:address": csvAddress1,
                                                    "custom:userCode": csvEmployeeId.toString(),
                                                    "custom:reportingManagerId": managerDetails ? managerDetails.user_Id : '',
                                                    "custom:isSixPeriodSAdmin": isSixPeriodSAdmin.toString(),
                                                    "custom:sixPeriodIsInitiator": sixPeriodIsInitiator.toString(),
                                                    "custom:sixPeriodIsApprover": sixPeriodIsApprover.toString(),
                                                    "custom:sixPeriodIsPayroll": sixPeriodIsPayroll.toString(),
                                                    "custom:certiSubRIsInitiator": certiSubRIsInitiator.toString(),
                                                    "custom:certiSubReIsApprover": certiSubReIsApprover.toString(),
                                                    "custom:certiSubReqIsPayroll": certiSubReqIsPayroll.toString(),
                                                    "custom:timeRIsInitiator": timeRIsInitiator.toString() === '1' ? '1' : '0',
                                                    "custom:timeRIsApprover": timeRIsApprover.toString() === '1' ? '1' : '0',
                                                    "custom:timeRIsPayroll": timeRIsPayroll.toString() === '1' ? '1' : '0',
                                                    "custom:timeRIsSAdmin": timeRIsSuperadmin.toString() === '1' ? '1' : '0',
                                                    "custom:ispersonnelIsAdmin": ispersonnelIsAdmin.toString(),
                                                    "custom:personnelIsInitiator": personnelIsInitiator.toString(),
                                                    "custom:personnelIsApprover": personnelIsApprover.toString(),
                                                    "custom:personnelIsPayroll": personnelIsPayroll.toString()
                                                },
                                                autoSignIn: {
                                                    // optional - enables auto sign in after user is confirmed
                                                    enabled: true,
                                                },
                                            });

                                            // Updating cognito id in Employee table
                                            var getEmployeeDetails = []
                                            if (existingEmployee[0].id) {
                                                getEmployeeDetails = await API.graphql({ query: queries.getEmployee, variables: { id: existingEmployee[0].id } });
                                                getEmployeeDetails = getEmployeeDetails.data ? getEmployeeDetails.data.getEmployee : []
                                            }

                                            if (getEmployeeDetails) {
                                                await API.graphql({
                                                    query: mutations.updateEmployee,
                                                    variables: {
                                                        input: {
                                                            id: existingEmployee[0].id,
                                                            _version: getEmployeeDetails._version,
                                                            user_Id: userCreated.userSub,
                                                            role: userCreated.role,
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });


                                } catch (e) {
                                    //toast.error(e.message);
                                }
                            }

                            var getEmployeeDetails = []
                            if (existingEmployee[0].id) {
                                getEmployeeDetails = await API.graphql({ query: queries.getEmployee, variables: { id: existingEmployee[0].id } });
                                getEmployeeDetails = getEmployeeDetails.data ? getEmployeeDetails.data.getEmployee : []
                            }
                            if (getEmployeeDetails) {
                                await API.graphql({
                                    query: mutations.updateEmployee,
                                    variables: {
                                        input: {
                                            id: existingEmployee[0].id,
                                            _version: getEmployeeDetails._version,
                                            employee_name: csvEmployeeName,
                                            firstName: csvFirstName.toUpperCase(),
                                            lastName: capitalizeFirstChar(csvLastName),
                                            role: csvRole,
                                        }
                                    }
                                });
                            }



                            await DataStore.delete(UserAppsPermission, (c) => c.UserId.eq(existingEmployee[0].user_Id)).then(async () => {
                                if (WEEKLY_ABSENCE_REPORT === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.WEEKLY_ABSENCE_REPORT, "UserId": existingEmployee[0].user_Id })) }
                                if (WEEKLY_ABSENCE_REPORT_ADMIN === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.WEEKLY_ABSENCE_REPORT_ADMIN, "UserId": existingEmployee[0].user_Id })) }
                                if (TIME_REPORT === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.TIME_REPORT, "UserId": existingEmployee[0].user_Id })) }
                                if (SIX_PERIOD === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.SIX_PERIOD, "UserId": existingEmployee[0].user_Id })) }
                                if (CLASSIFIED_SUB_REQUEST === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.CLASSIFIED_SUB_REQUEST, "UserId": existingEmployee[0].user_Id })) }
                                if (SUBSTITUTE_REQUEST_CERTIFICATED === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.SUBSTITUTE_REQUEST_CERTIFICATED, "UserId": existingEmployee[0].user_Id })) }
                                if (STIPENDS_FORM === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.STIPENDS_FORM, "UserId": existingEmployee[0].user_Id })) }
                                if (PERSONAL_SERVICE_AGREEMENT === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.PERSONAL_SERVICE_AGREEMENT, "UserId": existingEmployee[0].user_Id })) }
                                if (EMPLOYEE_HAND_BOOK === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.EMPLOYEE_HAND_BOOK, "UserId": existingEmployee[0].user_Id })) }
                                if (PERSONNEL_ACTION_FORM === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.PERSONNEL_ACTION_FORM, "UserId": existingEmployee[0].user_Id })) }
                            });

                            //Update user additional settings data
                            let response = [];
                            let listUserAdditionalSettingsData = await API.graphql(graphqlOperation(queries.listUserAdditionalSettings, {
                                filter: {
                                }, limit: 10000
                            }));

                            response = listUserAdditionalSettingsData.data.listUserAdditionalSettings.items.filter(item => item._deleted !== true);
                            response = listUserAdditionalSettingsData.data.listUserAdditionalSettings.items.filter(item => item.userId == existingEmployee[0].user_Id);


                            if (response.length > 0) {
                                // Update record

                                const originalUpdated = await API.graphql({
                                    query: mutations.updateUserAdditionalSettings,
                                    variables: {
                                        input: {
                                            id: response[0].id,
                                            _version: response[0]._version,
                                            stipendApprover: stipendApprover.toString() === '1' ? '1' : '0',
                                            stipendInitiator: stipendInitiator.toString() === '1' ? '1' : '0',
                                            stipendPayroll: stipendPayroll.toString() === '1' ? '1' : '0',
                                            subReqClassifiedInitiator: subReqClassifiedInitiator.toString() === '1' ? '1' : '0',
                                            subReqClassifiedApprover: subReqClassifiedApprover.toString() === '1' ? '1' : '0',
                                            subReqClassifiedPayroll: subReqClassifiedPayroll.toString() === '1' ? '1' : '0',
                                            personnelServiceAgreeInitiator: personnelServiceAgreeInitiator.toString() === '1' ? '1' : '0',
                                            personnelServiceAgreeApprover: personnelServiceAgreeApprover.toString() === '1' ? '1' : '0',
                                            personnelServiceAgreePayroll: personnelServiceAgreePayroll.toString() === '1' ? '1' : '0'
                                        }
                                    }
                                });

                            }
                            else {
                                let saveUserAdditionalData = await API.graphql(
                                    graphqlOperation(mutations.createUserAdditionalSettings, {
                                        input: {
                                            stipendApprover: stipendApprover.toString() === '1' ? '1' : '0',
                                            stipendInitiator: stipendInitiator.toString() === '1' ? '1' : '0',
                                            stipendPayroll: stipendPayroll.toString() === '1' ? '1' : '0',
                                            subReqClassifiedInitiator: subReqClassifiedInitiator.toString() === '1' ? '1' : '0',
                                            subReqClassifiedApprover: subReqClassifiedApprover.toString() === '1' ? '1' : '0',
                                            subReqClassifiedPayroll: subReqClassifiedPayroll.toString() === '1' ? '1' : '0',
                                            personnelServiceAgreeInitiator: personnelServiceAgreeInitiator.toString() === '1' ? '1' : '0',
                                            personnelServiceAgreeApprover: personnelServiceAgreeApprover.toString() === '1' ? '1' : '0',
                                            personnelServiceAgreePayroll: personnelServiceAgreePayroll.toString() === '1' ? '1' : '0',
                                            userId: existingEmployee[0].user_Id
                                        }
                                    })
                                );
                            }
                        }

                        if (strike === 0) {
                            await DataStore.save(
                                new Employee({
                                    "employee_name": csvEmployeeName,
                                    "firstName": csvFirstName.toUpperCase(),
                                    "lastName": capitalizeFirstChar(csvLastName),
                                    "phone_no": csvPhoneNumber.toString(),
                                    "email": csvEmail,
                                    "role":  csvRole,
                                    "address_1": csvAddress1,
                                    "address_2": csvAddress2,
                                    "city": csvCity,
                                    "zip_code": csvZipCode.toString(),
                                    "state": csvState,
                                    "country": csvCountry,
                                    "employee_code": csvEmployeeId.toString(),
                                    "school_id": schoolDetails ? schoolDetails.id : '',
                                    "employeeType": csvUserType,
                                    "designation": csvDesignation,
                                })
                            ).then(async (res) => {

                                let original = await DataStore.query(Employee, res.id);
                                allEmployees.push(original)
                                
                                // var fullEmpName = csvEmployeeName.split(' ');
                                // let firstName = fullEmpName[0] ? fullEmpName[0] : '';
                                // let lastName = fullEmpName[1] ? fullEmpName[1] : '';

                                /*  try {
                                     const cognito = new AWS.CognitoIdentityServiceProvider();
         
                                     var params =
                                     {
                                         UserPoolId: awsmobile.aws_user_pools_id,
                                         Limit: 100,
                                         "Filter": "email ^= \"" + L1_authoritys + "\""
                                     };
         
                                     await cognito.listUsers(params, (err, data) => {
                                         if (err) {
                                             //(err.message);
                                         } else {
                                             let usersData = []
                                             var sub = "";
                                             var email = "";
         
                                             data.Users.forEach((user, i) => {
                                                 sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
                                                 email = user.Attributes.find(attr => attr.Name === "email")?.Value;
                                                 usersData.push(sub)
         
                                                 //usersData.push({ firstName: userFirstName, lastName: userLastName, label: userFirstName + " " + userLastName, value: adminUsers[i].Username });
                                             })
         
                                         }
                                     });
         
                                 } catch (e) {
                                     toast.error(e.message);
                                 } */


                                if (userPermission === 1) {
                                    try {
                                        let userCreated = await Auth.signUp({
                                            username: csvEmail,
                                            password: 'Gusd@2023',
                                            attributes: {
                                                email: csvEmail,
                                                name: csvEmployeeName,
                                                "custom:firstName": csvFirstName.toUpperCase(),
                                                "custom:lastName": capitalizeFirstChar(csvLastName),
                                                "custom:role": csvRole,
                                                "name": csvEmployeeName,
                                                "custom:city": csvCity,
                                                "custom:gender": '',
                                                "custom:mobileNumber": csvPhoneNumber.toString(),
                                                "custom:address": csvAddress1,
                                                "custom:userCode": csvEmployeeId.toString(),
                                                "custom:reportingManagerId": managerDetails ? managerDetails.user_Id : '',
                                                "custom:isSixPeriodSAdmin": isSixPeriodSAdmin.toString(),
                                                "custom:sixPeriodIsInitiator": sixPeriodIsInitiator.toString(),
                                                "custom:sixPeriodIsApprover": sixPeriodIsApprover.toString(),
                                                "custom:sixPeriodIsPayroll": sixPeriodIsPayroll.toString(),
                                                "custom:ispersonnelIsAdmin": ispersonnelIsAdmin.toString(),
                                                "custom:personnelIsInitiator": personnelIsInitiator.toString(),
                                                "custom:personnelIsApprover": personnelIsApprover.toString(),
                                                "custom:personnelIsPayroll": personnelIsPayroll.toString(),
                                                "custom:certiSubRIsInitiator": certiSubRIsInitiator.toString(),
                                                "custom:certiSubReIsApprover": certiSubReIsApprover.toString(),
                                                "custom:certiSubReqIsPayroll": certiSubReqIsPayroll.toString(),
                                                "custom:timeRIsInitiator": timeRIsInitiator.toString() === '1' ? '1' : '0',
                                                "custom:timeRIsApprover": timeRIsApprover.toString() === '1' ? '1' : '0',
                                                "custom:timeRIsPayroll": timeRIsPayroll.toString() === '1' ? '1' : '0',
                                                "custom:timeRIsSAdmin": timeRIsSuperadmin.toString() === '1' ? '1' : '0',
                                                // "custom:L1_authoritys": L1_authoritys ? L1_authoritys : '',
                                                // "custom:L2_authoritys": L2_authoritys ? L2_authoritys : '',

                                            },
                                            autoSignIn: {
                                                // optional - enables auto sign in after user is confirmed
                                                enabled: true,
                                            },
                                        });

                                        if (WEEKLY_ABSENCE_REPORT === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.WEEKLY_ABSENCE_REPORT, "UserId": userCreated.userSub })) }
                                        if (WEEKLY_ABSENCE_REPORT_ADMIN === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.WEEKLY_ABSENCE_REPORT_ADMIN, "UserId": userCreated.userSub })) }
                                        if (TIME_REPORT === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.TIME_REPORT, "UserId": userCreated.userSub })) }
                                        if (SIX_PERIOD === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.SIX_PERIOD, "UserId": userCreated.userSub })) }
                                        if (CLASSIFIED_SUB_REQUEST === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.CLASSIFIED_SUB_REQUEST, "UserId": userCreated.userSub })) }
                                        if (SUBSTITUTE_REQUEST_CERTIFICATED === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.SUBSTITUTE_REQUEST_CERTIFICATED, "UserId": userCreated.userSub })) }
                                        if (STIPENDS_FORM === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.STIPENDS_FORM, "UserId": userCreated.userSub })) }
                                        if (PERSONAL_SERVICE_AGREEMENT === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.PERSONAL_SERVICE_AGREEMENT, "UserId": userCreated.userSub })) }
                                        if (EMPLOYEE_HAND_BOOK === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.EMPLOYEE_HAND_BOOK, "UserId": userCreated.userSub })) }
                                        if (PERSONNEL_ACTION_FORM === 1) { await DataStore.save(new UserAppsPermission({ "AppId": appIdData.PERSONNEL_ACTION_FORM, "UserId": userCreated.userSub })) }

                                        let original = await DataStore.query(Employee, res.id);
                                        var updatedUserDetails = await DataStore.save(
                                            Employee.copyOf(original, (updated) => {
                                                updated.user_Id = userCreated.userSub;
                                            })
                                        );
                                        employeeListData.push(updatedUserDetails)

                                        // Save user additional data
                                        let saveUserAdditionalData = await API.graphql(
                                            graphqlOperation(mutations.createUserAdditionalSettings, {
                                                input: {
                                                    stipendApprover: stipendApprover.toString() === '1' ? '1' : '0',
                                                    stipendInitiator: stipendInitiator.toString() === '1' ? '1' : '0',
                                                    stipendPayroll: stipendPayroll.toString() === '1' ? '1' : '0',
                                                    subReqClassifiedInitiator: subReqClassifiedInitiator.toString() === '1' ? '1' : '0',
                                                    subReqClassifiedApprover: subReqClassifiedApprover.toString() === '1' ? '1' : '0',
                                                    subReqClassifiedPayroll: subReqClassifiedPayroll.toString() === '1' ? '1' : '0',
                                                    personnelServiceAgreeInitiator: personnelServiceAgreeInitiator.toString() === '1' ? '1' : '0',
                                                    personnelServiceAgreeApprover: personnelServiceAgreeApprover.toString() === '1' ? '1' : '0',
                                                    personnelServiceAgreePayroll: personnelServiceAgreePayroll.toString() === '1' ? '1' : '0',
                                                    userId: userCreated.userSub
                                                }
                                            })
                                        );
                                    }
                                    catch (error) {

                                        try {
                                            const cognito = new AWS.CognitoIdentityServiceProvider();

                                            var params =
                                            {
                                                UserPoolId: awsmobile.aws_user_pools_id,
                                                Limit: 60,
                                                "Filter": "email ^= \"" + res.email + "\""
                                            };

                                            let cognitoUserList = await cognito.listUsers(params, async (err, data) => {
                                                if (err) {
                                                    // return '';
                                                    //(err.message);
                                                } else {
                                                    var sub = "";
                                                    data.Users.forEach(async (user, i) => {
                                                        sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;

                                                        await updateUserSUB(sub, res.id,csvRole)

                                                        // Update Cognito

                                                        const params = {
                                                            UserPoolId: awsmobile.aws_user_pools_id,
                                                            Username: sub,
                                                            UserAttributes: [
                                                                {
                                                                    Name: "name",
                                                                    Value: (csvEmployeeName) ? csvEmployeeName : '',
                                                                },
                                                                {
                                                                    Name: "custom:firstName",
                                                                    Value: (csvFirstName) ? csvFirstName.toUpperCase() : '',
                                                                },
                                                                {
                                                                    Name: "custom:lastName",
                                                                    Value: (csvLastName) ? capitalizeFirstChar(csvLastName) : '',
                                                                },
                                                                {
                                                                    Name: "custom:personnelIsApprover",
                                                                    Value: (personnelIsApprover) ? personnelIsApprover.toString() : '0',
                                                                },
                                                                {
                                                                    Name: "custom:personnelIsInitiator",
                                                                    Value: (personnelIsInitiator) ? personnelIsInitiator.toString() : '0',
                                                                },
                                                                {
                                                                    Name: "custom:personnelIsPayroll",
                                                                    Value: (personnelIsPayroll) ? personnelIsPayroll.toString() : '0',
                                                                },
                                                                {
                                                                    Name: "custom:ispersonnelIsAdmin",
                                                                    Value: (ispersonnelIsAdmin) ? ispersonnelIsAdmin.toString() : '0',
                                                                },
                                                            ],
                                                        };

                                                        try {
                                                            cognito.adminUpdateUserAttributes(params, function (err, data) {
                                                                if (err){
                                                                    console.log("Errr rr", err, err.stack);
                                                                }
                                                                else{
                                                                    console.log(data);
                                                                }
                                                            });
                                                        } catch (error) {
                                                            console.error('Error updating user attribute:', error);
                                                        }
                                                    })
                                                }
                                            });


                                        } catch (e) {
                                            //toast.error(e.message);
                                        }

                                        // End
                                    }
                                }

                            });
                        }
                    }

                }
            });
        }

        setFileObj("")
        setVisibleImport(false)
        toast.success("Imported Successfully");

    }
  return (
   <>
   
   <Layout pageTitle="Dashboard">

                <div className="schlDash">
                    <div className="dashboard-main-wrapper pr-4 mt-3">
                        <div className='wrapper-custom-views mt-8'>

                            <div className="flex flex-1 flex-wrap pt-5 px-0 top-action-wrapper schoolUpperBlock">
                                <div className="md:flex xs:w-full sm:w-full md:w-auto flex-row align-center">
                                    <div className="md:flex block md:col-span-2 mb-4">
                                    </div>
                                    <div className="md:flex block">
                                        <h2 className="page-title px-5">Employees</h2>
                                    </div>
                                </div>

                                <div className="md:flex flex-1 px-5 flex-row xs:w-full sm:w-full md:w-auto align-center justify-end md:ml-auto gap-3 right-side">
                                    <div className="md:flex block gap-3">
                                        <Link href="/admin/masters" className=" py-2 px-5 bg-white text-[#344054] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md dark:bg-[#333231] dark:border-[#333231]  dark:text-[#FFFFFF]">Back</Link>
                                        <Link href="/admin/masters/employee/createEmployee"  className=" py-2 px-6 bg-btn-blue text-[#fff] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6 bg-[#113699]  justify-center rounded-lg border border-[#D0D5DD] rounded-md">Create</Link>
                                        <div
                                            onClick={() => {
                                                setVisibleImport(true);
                                                setChecked(true)
                                                setPreSignupChecked(false)
                                            }}
                                            className="flex py-2 px-5 bg-btn-blue hover:bg-blue-0 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-[14px] text-center font-medium drop-shadow shadow-md focus:outline-none focus:ring-1 focus:ring-offset-1 leading-6  justify-center rounded-md border-1 border-[#1570EF] bg-[#113699]"
                                        >
                                            Import
                                        </div>

                                        <div
                                            href=""
                                            onClick={() => setVisible(true)}
                                            className="flex py-2 px-5 bg-btn-blue hover:bg-blue-0 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-[14px] text-center font-medium drop-shadow shadow-md focus:outline-none focus:ring-1 focus:ring-offset-1 leading-6  justify-center rounded-md border-1 border-[#1570EF] bg-[#113699]"
                                        >
                                            Import Login
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        searchEmployee(e.target.value);
                                    }}
                                    className="text-[15px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-4 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231]"
                                    placeholder="Search"
                                />
                            </div>
                            <div>
                                <div className={"block w-full pt-5"}>
                                <DataTable value={products} className='employeetable ' paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  customStyles={DataTableCustomStyles} showGridlines scrollable tableStyle={{minWidth:"50rem", width:"100%"}}>
                                        <Column field="code" header="Role"></Column>
                                        <Column field="name" header="First Name"></Column>
                                        <Column field="category" header="Last Name"></Column>
                                        <Column field="description" header="Email"></Column>
                                        <Column field="quantity" header="Status"></Column>
                                        <Column field="rating" header="Created"></Column>
                                        <Column body={actionBodyTemplate} frozen alignFrozen="right" header="Action" style={{ width: '8%' }}></Column>

                                        </DataTable>
                                        {/* {
                                        <DataTable value={products} className='employeetable' paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  customStyles={DataTableCustomStyles} showGridlines tableStyle={{ }}>
                                        <Column field="code" header="Employees"></Column>
                                        <Column field="name" header="Employee Code"></Column>
                                        <Column field="category" header="School"></Column>
                                        <Column field="quantity" header="Email"></Column>
                                        <Column field="quantity" header="City"></Column>
                                        <Column body={actionBodyTemplate} header="Action" style={{ width: '3%' }}></Column>
                                        
                                        </DataTable>
                                        
                                        } */}
                                  
                                    
                                </div>
                            </div>
                        </div>

                        <Dialog className="relative reports-popup" visible={visible} position="right" style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setVisible(false)} draggable={false} resizable={false}>
                            <div className="">
                                <div className="bg-[#F5F6F7] h-screen">
                                    <div className="p-5">
                                        <Link href='abc' onClick={() => setVisibleImport(false)} className="py-3">
                                            <Image
                                                src={"sidebar"} alt="user" width="24" height="24" /></Link>
                                        <div className="mb-3 text-[#113699] mt-2 font-semibold">Import Employees</div>

                                        <div className="space-y-2 print:space-y-0">
                                            <div className='flex items-center gap-2'>
                                            <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                                <div>Employee</div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                            <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                                <div>Pre Sign-up</div>
                                            </div>
                                        </div>

                                        {/* <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Pre sign-up Employees</div> */}

                                        <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                                            {checked ?
                                                <input id="fileProfilePic" type="file"
                                                     /> :
                                                <input id="fileProfilePic" type="file"
                                                   
                                                />}
                                        </div>

                                    </div>
                                    <div className='p-2 float-right'>
                                        <a href="#" onClick={(e) => downloadDocument('public/importFile/importPreSignUpEmployee.csv')}
                                            className="text-sm text-[#0000FF] px-4 py-2 dark:text-white" rel="noreferrer">
                                            Download Template </a>
                                    </div>
                                    <div className='p-2 mt-4 ml-4'>

                                    </div>
                                    <div className="absolute right-5 bottom-5 flex justify-end gap-2">
                                        <Link href='#' className="bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center w-20" onClick={() => setVisibleImport(false)}>Cancel</Link>

                                        {checked ?
                                            <Link href='#' className="w-32 text-center flex items-center tableBtn blue radius8" onClick={() => previewEmployee()}>Import</Link> : <Link href='' className="w-32 text-center flex items-center tableBtn blue radius8" onClick={() => saveSignupEmployee()}>Import</Link>
                                        }

                                    </div>
                                </div>
                            </div>
                        </Dialog>


                        <Dialog className="relative reports-popup" visible={visible} position="right" style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setVisible(false)} draggable={false} resizable={false}>
                            <div className="">
                                <div className="bg-[#F5F6F7] h-screen">
                                    <div className="p-5">
                                        <Link href='' onClick={() => setVisible(false)} className="py-3">
                                            <Image
                                                src={"sidebar"} alt="user" width="24" height="24" /></Link>
                                        <div className="mb-3 text-[#113699] mt-2 font-semibold">Import Login</div>

                                        {/* <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Pre sign-up Employees</div> */}

                                        <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                                            <input id="fileProfilePic" type="file"
                                                
                                            />
                                        </div>

                                    </div>

                                    <div className="absolute right-5 bottom-5 flex justify-end gap-2">
                                        <Link href='#' className="bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center w-20" onClick={() => setVisible(false)}>Cancel</Link>

                                        <Link href='#' className="w-32 text-center flex items-center tableBtn blue radius8" onClick={() => saveSignupEmployeeLogin()}>Import Login</Link>


                                    </div>
                                </div>
                            </div>
                        </Dialog>

                    </div>
                </div>
            </Layout>
   
   </>
  )
}

export default employee