import Head from "next/head";
export default function WCommentInit() {
    return (
        <>
            <script type="module">
                {`
                Waline.init({
                    el: '#Comments',
                    serverURL: 'https://logwaline.vercel.app'
                })
                `}</script>
        </>
    )
}