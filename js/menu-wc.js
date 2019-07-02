'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Fractal Typescript Documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ArraySerializer.html" data-type="entity-link">ArraySerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Book.html" data-type="entity-link">Book</a>
                            </li>
                            <li class="link">
                                <a href="classes/Collection.html" data-type="entity-link">Collection</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataArraySerializer.html" data-type="entity-link">DataArraySerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Item.html" data-type="entity-link">Item</a>
                            </li>
                            <li class="link">
                                <a href="classes/JsonApiSerializer.html" data-type="entity-link">JsonApiSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Manager.html" data-type="entity-link">Manager</a>
                            </li>
                            <li class="link">
                                <a href="classes/NullResource.html" data-type="entity-link">NullResource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParamBag.html" data-type="entity-link">ParamBag</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResourceAbstract.html" data-type="entity-link">ResourceAbstract</a>
                            </li>
                            <li class="link">
                                <a href="classes/Scope.html" data-type="entity-link">Scope</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScopeFactory.html" data-type="entity-link">ScopeFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SerializerAbstract.html" data-type="entity-link">SerializerAbstract</a>
                            </li>
                            <li class="link">
                                <a href="classes/TransformerAbstract.html" data-type="entity-link">TransformerAbstract</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CursorInterface.html" data-type="entity-link">CursorInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginatorInterface.html" data-type="entity-link">PaginatorInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceInterface.html" data-type="entity-link">ResourceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScopeFactoryInterface.html" data-type="entity-link">ScopeFactoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Serializer.html" data-type="entity-link">Serializer</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});