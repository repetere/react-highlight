//@ts-ignore
import hljs from 'highlight.js/lib/highlight';
import React from'react';

class Highlight extends React.Component {
    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
    //@ts-ignore
    const {className, languages} = this.props;
        //@ts-ignore
        const nodes = this.el.querySelectorAll('pre code');

        if ((languages.length === 0) && className) {
            languages.push(className);
        }

        //@ts-ignore
        languages.forEach(lang => {
            hljs.registerLanguage(lang, require('highlight.js/lib/languages/' + lang));
        });

        for (let i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i])
        }
    }

    //@ts-ignore
    setEl = (el) => {
        //@ts-ignore
        this.el = el;
    };

    render() {
        //@ts-ignore
        const {children, className, element: Element, innerHTML} = this.props;
        const props = { ref: this.setEl, className };

        if (innerHTML) {
            //@ts-ignore
            props.dangerouslySetInnerHTML = { __html: children };
            if (Element) {
                return <Element {...props} />;
            }
            return <div {...props} />;
        }

        if (Element) {
            return <Element {...props}>{children}</Element>;
        }
        return <pre ref={this.setEl}><code className={className}>{children}</code></pre>;
    }
}
//@ts-ignore
Highlight.defaultProps = {
    innerHTML: false,
    className: '',
    languages: [],
};

export default Highlight;
