import React, { Component } from 'react'
import { ReactDOM } from 'react';

// The official <CKEditor> component for React.
import { CKEditor } from '@ckeditor/ckeditor5-react';

// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

// The base editor class and features required to run the editor.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

// CKEditor plugin implementing a product widget to be used in the editor content.
import ProductPreviewEditing from '../../ckeditor/productpreviewediting';

// React components to render the list of products and the product preview.
import ProductList from '../../ckeditor/productlist';
import ProductPreview from '../../ckeditor/productpreview';

export default class Editor extends Component {
    constructor( props ) {
        super( props );

        // A place to store the reference to the editor instance created by the <CKEditor> component.
        // The editor instance is created asynchronously and is only available when the editor is ready.
        this.editor = null;

        this.state = {
            // The initial editor data. It is bound to the editor instance and will change as
            // the user types and modifies the content of the editor.
            editorData: '<h2>Check our last minute deals!</h2><p>The capital city of <a href="https://en.wikipedia.org/wiki/Malta">Malta</a> is the top destination this summer. It’s home to cutting-edge contemporary architecture, baroque masterpieces, delicious local cuisine, and at least 8 months of sun.</p><section class="product" data-id="2"></section><p>You’ll definitely love exploring <a href="https://en.wikipedia.org/wiki/Warsaw">Warsaw</a>! The best time to visit the city is July and August when it’s cool enough not to break a sweat and hot enough to enjoy summer. The city, which has quite a combination of both old and modern textures, is located by the river of Vistula.</p><section class="product" data-id="1"></section><h3>Other destinations</h3><figure class="table"><table><thead><tr><th>Destination</th><th>Trip details</th></tr></thead><tbody><tr><td><section class="product" data-id="3"></section><p>&nbsp;</p></td><td>Getting used to an entirely different culture can be challenging. While it’s also nice to learn about cultures online or from books, nothing comes close to experiencing cultural diversity in person. You learn to appreciate each and every single one of the differences while you become more culturally fluid. <a href="http://ckeditor.com">Find out more...</a></td></tr><tr><td><section class="product" data-id="4"></section><p>&nbsp;</p></td><td>Tourists frequently admit that Taj Mahal "simply cannot be described with words". And that’s probably true. The more you try the more speechless you become. Words give only a semblance of truth. <a href="http://ckeditor.com">Find out more...</a></td></tr></tbody></table></figure>'
        };
        // The configuration of the <CKEditor> instance.
        this.editorConfig = {
            plugins: [
                // A set of editor features to be enabled and made available to the user.
                Essentials, Heading, Bold, Italic, Underline,
                Link, Paragraph, Table, TableToolbar,

                // Your custom plugin implementing the widget is loaded here.
                ProductPreviewEditing
            ],
            toolbar: [
                'heading',
                '|',
                'bold', 'italic', 'underline',
                '|',
                'link', 'insertTable',
                '|',
                'undo', 'redo'
            ],
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells'
                ]
            },
            // The configuration of the Products plugin. It specifies a function that will allow
            // the editor to render a React <ProductPreview> component inside a product widget.
            products: {
                productRenderer: ( id, domElement ) => {
                    const product = this.props.products.find( product => product.id === id );

                    ReactDOM.render(
                        <ProductPreview id={id} {...product} />,
                        domElement
                    );
                }
            }
        };
        this.handleEditorDataChange = this.handleEditorDataChange.bind( this );
        this.handleEditorReady = this.handleEditorReady.bind( this );
    }
    // A handler executed when the user types or modifies the editor content.
    // It updates the state of the application.
    handleEditorDataChange( evt, editor ) {
        this.setState( {
            editorData: editor.getData()
        } );
    }
    // A handler executed when the editor has been initialized and is ready.
    // It synchronizes the initial data state and saves the reference to the editor instance.
    handleEditorReady( editor ) {
        this.editor = editor;
        this.setState( {
            editorData: editor.getData()
        } );
        // CKEditor 5 inspector allows you to take a peek into the editor's model and view
        // data layers. Use it to debug the application and learn more about the editor.
        CKEditorInspector.attach( editor );
    }

    render() {
        return [
            // The application renders two columns:
            // * in the left one, the <CKEditor> and the textarea displaying live
            //   editor data are rendered.
            // * in the right column, a <ProductList> is rendered with available <ProductPreviews>
            //   to choose from.
            <div className="app__offer-editor" key="offer-editor">
                <h3>Product offer editor</h3>
                <CKEditor
                    editor={ClassicEditor}
                    data={this.state.editorData}
                    config={this.editorConfig}
                    onChange={this.handleEditorDataChange}
                    onReady={this.handleEditorReady}
                />

                <h3>Editor data</h3>
                <textarea value={this.state.editorData} readOnly={true}></textarea>
            </div>,
            <ProductList
                key="product-list"
                products={this.props.products}
                onClick={( id ) => {
                    this.editor.execute( 'insertProduct', id );
                    this.editor.editing.view.focus();
                }}
            />
        ];
    }
}
