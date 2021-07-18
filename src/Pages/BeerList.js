import React, {useState, useEffect, useRef} from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios';
import {ChevronLeft, ChevronRight, Clear, FirstPage, LastPage, Search, ShoppingCart} from '@material-ui/icons/';
import { Dialog, DialogActions, DialogTitle, DialogContent, withStyles } from "@material-ui/core";


const BeerList = () => {
    const tableIcons = {
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        ShoppingCart: forwardRef((props, ref) => <ShoppingCart {...props} ref={ref} />)
    };

    const [beerList, setBeerList] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await Axios
                    .get('https://api.punkapi.com/v2/beers');
                console.log(data);
                setBeerList(data)
            } catch (err) {
                alert("에러입니다.")
            }}
        fetchData().then(r => null);
    }, []);

    const alertMyRow = (row) => (
        alert(`name: ${row.name},
               tagline: ${row.tagline},
               firstBrewed: ${row.first_brewed},
               description: ${row.description},
               imageUrl: ${row.image_url},
               abv: ${row.abv},
               ibu: ${row.ibu},
               target_fg: ${row.target_fg},
               target_og: ${row.target_og},
               ebc: ${row.ebc},
               srm: ${row.srm},
               ph: ${row.ph},
               attenuation_level: ${row.attenuation_level},
               volume-value: ${row.volume.value},
               volume-unit: ${row.volume.unit},
               boil_volume-value: ${row.boil_volume.value},
               boil_volume-unit: ${row.boil_volume.unit},
               method-mash_temp-temp-value: ${row.method.mash_temp[0].temp.value},
               method-mash_temp-temp-unit: ${row.method.mash_temp[0].temp.unit},
               method-mash_temp-duration: ${row.method.mash_temp[0].duration},
               method-fermentation-temp-value: ${row.method.fermentation.temp.value},
               method-fermentation-temp-unit: ${row.method.fermentation.temp.unit},
               method-twist: ${row.method.twist},
               ingredients-malt-name: ${row.ingredients.malt[0].name},
               ingredients-malt-amount-value: ${row.ingredients.malt[0].amount.value},
               ingredients-malt-amount-value: ${row.ingredients.malt[0].amount.unit},
               ingredients-malt-name: ${row.ingredients.malt[1].name},
               ingredients-malt-amount-value: ${row.ingredients.malt[1].amount.value},
               ingredients-malt-amount-value: ${row.ingredients.malt[1].amount.unit},
               ingredients-malt-name: ${row.ingredients.malt[2].name},
               ingredients-malt-amount-value: ${row.ingredients.malt[2].amount.value},
               ingredients-malt-amount-value: ${row.ingredients.malt[2].amount.unit},
               ingredients-hops1-name: ${row.ingredients.hops[0].name},
               ingredients-hops1-amount-value: ${row.ingredients.hops[0].amount.value},
               ingredients-hops1-amount-value: ${row.ingredients.hops[0].amount.unit},
               ingredients-hops1-add: ${row.ingredients.hops[0].add},
               ingredients-hops1-attribute: ${row.ingredients.hops[0].attribute},
               ingredients-hops2-name: ${row.ingredients.hops[1].name},
               ingredients-hops2-amount-value: ${row.ingredients.hops[1].amount.value},
               ingredients-hops2-amount-value: ${row.ingredients.hops[1].amount.unit},
               ingredients-hops2-add: ${row.ingredients.hops[1].add},
               ingredients-hops2-attribute: ${row.ingredients.hops[1].attribute},
               ingredients-hops3-name: ${row.ingredients.hops[2].name},
               ingredients-hops3-amount-value: ${row.ingredients.hops[2].amount.value},
               ingredients-hops3-amount-value: ${row.ingredients.hops[2].amount.unit},
               ingredients-hops3-add: ${row.ingredients.hops[2].add},
               ingredients-hops3-attribute: ${row.ingredients.hops[2].attribute},
               ingredients-hops4-name: ${row.ingredients.hops[3].name},
               ingredients-hops4-amount-value: ${row.ingredients.hops[3].amount.value},
               ingredients-hops4-amount-value: ${row.ingredients.hops[3].amount.unit},
               ingredients-hops4-add: ${row.ingredients.hops[3].add},
               ingredients-hops4-attribute: ${row.ingredients.hops[3].attribute},
               ingredients-hops5-name: ${row.ingredients.hops[4].name},
               ingredients-hops5-amount-value: ${row.ingredients.hops[4].amount.value},
               ingredients-hops5-amount-value: ${row.ingredients.hops[4].amount.unit},
               ingredients-hops5-add: ${row.ingredients.hops[4].add},
               ingredients-hops5-attribute: ${row.ingredients.hops[4].attribute},
               ingredients-yeast: ${row.ingredients.yeast},
               food_pairing: ${row.food_pairing},
               brewers_tips: ${row.brewers_tips},
               contributed_by: ${row.contributed_by}`));

    return (
        <>
        <div>
            <MaterialTable
                icons={tableIcons}
                columns={[
                    { title: "No", field: "id" },
                    { itle: "BeerName", field: "name",
                        render:(row)=>
                            <a href={'#'} onClick={() => alertMyRow(row)}>
                            {row.name}
                            </a> }
                ]}
                data={beerList}
                title="맥주 리스트"
                options={{pageSize:25,
                    pageSizeOptions:'',
                    selection: true
                }}
                actions={[
                    { tooltip: 'select items',
                      icon: () => <ShoppingCart />,
                      onClick: (evt, data) => alert(data.length + '개가 담겼습니다.')
                    }
                ]}
            />
        </div>
        </>
    )};

export default BeerList;