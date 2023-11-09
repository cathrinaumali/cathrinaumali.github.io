import React from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
// Styles
import "./result.scss";
// Types
import { HouseDetailsData } from "../../utils/types";

type ResultProps = HouseDetailsData;

const ResultComponent = ({ data, handleReset }: ResultProps) => {
  const { foundation, size, floors, roofType, garden } = data;
  return (
    <div className="result-page__container">
      <Card
        className="result-page"
        elevation={10}
        style={{
          padding: "40px",
          margin: "20px",
          borderRadius: "15px",
          background: "#f2f2f2",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <b> 🏡 House Details</b>
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={`Foundation: ${foundation}`}
                style={{ color: "#333" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Size: ${size}`}
                style={{ color: "#333" }}
              />
            </ListItem>
            <ListItem>
              <div className="floors-container">
                <Typography variant="subtitle1">
                  Floors: {floors?.length}
                </Typography>
                <div>
                  {floors.map((floor) => (
                    <div key={floor.id} className="floors-content">
                      <Typography variant="subtitle1">{floor.name}</Typography>
                      {floor.rooms.map((room) => (
                        <div key={room.id}>
                          <Typography
                            variant="subtitle2"
                            style={{
                              color: "#333",
                              marginTop: "5px",
                              marginLeft: "20px",
                            }}
                          >
                            Room: {room.name}
                          </Typography>
                          <List dense>
                            {room.windows.map((window) => (
                              <ListItem key={window.id}>
                                <ListItemText
                                  primary={`Window: ${window.name}`}
                                  secondary={`Type: ${window.type}, Style: ${window.style}, Glass Type: ${window.glassType}`}
                                  style={{ color: "#555", marginLeft: "20px" }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Roof Type: ${roofType}`}
                style={{ color: "#333" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Garden Type: ${garden.type}`}
                secondary={`Plants: ${garden.plants.join(", ")}`}
                style={{ color: "#333" }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <div className="result-page__buttons">
        <Button variant="outlined" onClick={handleReset}>
          Reset Answers
        </Button>
      </div>
    </div>
  );
};

export default ResultComponent;
