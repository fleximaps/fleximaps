import React from 'react';

import Promise from 'bluebird';


import parse from 'csv-parse';
import Overlay from './Overlay';

import CheckboxInput from './inputs/CheckboxInput';
import FileInput from './inputs/FileInput';
import Button from './inputs/Button';

class ImportMapOverlay extends React.Component {
    constructor(){
        super();

        this.state= {
            isHexagonal: true,
            file: null,
            fileErrors: []
        };
    }
    render() {
        const props = this.props;
        return (
            <Overlay title='Import a new map (CSV-Format)' onClose={this.props.onClose}>
                <form>
                    <CheckboxInput onChange={this._onIsHexagonalChange.bind(this)} label="Is it an hexagonal map?" value={this.state.isHexagonal}/>
                    <FileInput errors={this.state.fileErrors} onChange={this._onFilesChanged.bind(this)} label="CSV"/>
                    <Button onClick={this._onSubmit.bind(this)}>Import</Button>
                </form>
            </Overlay>
        );
    }
    _onFilesChanged(files){
        const component = this;

        const parseCSV = this._parseCSV;

        this._readFile(files[0])
            .then(function(fileContent){
                return parseCSV(fileContent)
                    .catch(
                        function(error){
                            return Promise.reject(new Error([error.message]));
                        }
                    );
            })
            .then(function(data){
                const numRows = data.length;

                if(typeof numRows === undefined || numRows === 0){
                    const error = new Error('No rows found.');
                    return Promise.reject(error);
                }else{
                    const numCols = data[0].length;
                    const tileTypes = [];

                    for(let rowNum = 0; rowNum < numRows; rowNum++){
                        let row = data[rowNum];

                        if(row.length !== numCols){
                            const error = new Error('All the rows must have the same columns.');
                            return Promose.reject(error);
                        }

                        for(let colNum = 0; colNum < row.length; colNum++){
                            const tileType = row[colNum];
                            tileTypes.push(tileType);
                        }
                    }

                    return {
                        numCols: numCols,
                        numRows: numRows,
                        tileTypes: tileTypes
                    };
                }
            })
            .then(
                function(state){
                    state.fileErrors = [];
                    component.setState(state);
                 },
                function(error){
                    component.setState({
                        fileErrors: [error.message]
                    });
                }
            );
    }
    _onIsHexagonalChange(value){
        this.setState({
            isHexagonal: value
        });
    }
    _onSubmit(){
        const state = this.state;

        this.props.onSubmit({
            numCols: state.numCols,
            numRows: state.numRows,
            isHexagonal: state.isHexagonal,
            tileTypes: state.tileTypes
        });
    }
    _readFile(file){
        const reader = new FileReader();

        const promise = new Promise(function(resolve, reject) {
            reader.onload = function() {
                if(reader.error){
                    const error = new Error(reader.error);
                    reject(error);
                }else{
                    resolve(reader.result);
                }

            };
        });
        reader.readAsText(file);

        return promise;
    }
    _parseCSV(text){
        return new Promise(function(resolve, reject) {
            parse(text, {delimiter: ';'}, function(err, data){
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
};

ImportMapOverlay.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};

export default ImportMapOverlay;