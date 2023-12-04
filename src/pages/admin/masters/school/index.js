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
function index() {
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);

   const actionBodyTemplate =()=>{
    return(
        <div className='flex gap-2'>
              <Link href='/admin/masters/school/createSchool'><img
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
            name: 'School',
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
                        <h2 className="page-title px-5">Schools</h2>
                    </div>
                </div>

                <div className="md:flex flex-1 px-5 flex-row xs:w-full sm:w-full md:w-auto align-center justify-end md:ml-auto gap-3 right-side">
                    <div className="md:flex block gap-3">
                        <Link href="/admin/masters" className=" py-2 px-5 bg-white text-[#344054] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md dark:bg-[#333231] dark:border-[#333231]  dark:text-[#FFFFFF]">Back</Link>
                        <Link href="/admin/masters/school/createSchool"  className=" py-2 px-6 bg-btn-blue text-[#fff] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6 bg-[#113699]  justify-center rounded-lg border border-[#D0D5DD] rounded-md">Create</Link>
                        {/* <Link href="abc"
                            onClick={() => {
                                setVisibleImport(true);
                                setChecked(true)
                                setPreSignupChecked(false)
                            }}
                            className="flex py-2 px-5 bg-btn-blue hover:bg-blue-0 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-[14px] text-center font-medium drop-shadow shadow-md focus:outline-none focus:ring-1 focus:ring-offset-1 leading-6  justify-center rounded-md border-1 border-[#1570EF] bg-[#113699]"
                        >
                            Import
                        </Link> */}

                        {/* <Link
                            href="abc"
                            onClick={() => setVisible(true)}
                            className="flex py-2 px-5 bg-btn-blue hover:bg-blue-0 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-[14px] text-center font-medium drop-shadow shadow-md focus:outline-none focus:ring-1 focus:ring-offset-1 leading-6  justify-center rounded-md border-1 border-[#1570EF] bg-[#113699]"
                        >
                            Import Login
                        </Link> */}

                    </div>
                </div>
            </div>

            <div>
                {/* <input
                    type="text"
                    onChange={(e) => {
                        searchEmployee(e.target.value);
                    }}
                    className="text-[15px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-4 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231]"
                    placeholder="Search"
                /> */}
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
                        {
                        // <DataTable value={products} className='employeetable mt-[35px]' paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  customStyles={DataTableCustomStyles} showGridlines tableStyle={{  }}>
                        // <Column field="code" header="School Code"></Column>
                        // <Column field="name" header="School Name"></Column>
                        // <Column field="category" header="Adress"></Column>
                        // <Column field="quantity" header="City"></Column>
                        // <Column field="quantity" header="Zip Code"></Column>
                        // <Column field="quantity" header="State"></Column>
                        // <Column body={actionBodyTemplate} header="Action" style={{ width: '3%' }}></Column>
                        
                        // </DataTable>
                        
                        }
                  
                    
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

export default index