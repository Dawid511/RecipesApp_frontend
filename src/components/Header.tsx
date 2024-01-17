import {Link} from "react-router-dom";
import {Group} from "@mantine/core";

export const Header = () => {
    return (
        <div>
            <Group justify="space-between">
                <Group>
                    <img
                        src={process.env.PUBLIC_URL + "PyszneInspiracje.jpg"}
                        alt="Pyszne Inspiracje Image"
                        style={{
                            borderRadius: "10px",
                            height: "120px",
                            width: "auto",
                        }}
                    />


                </Group>
            </Group>
        </div>
    )
}
