import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import PageHead from '../shared/PageHead';
import Link from 'next/link';
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

export default function Home({ data }) {
  return (
    <div>
      <PageHead title="朋友们 - Hajeekn" />
      <section className="max-w-2xl mx-auto px-4" fr-fix-stroke="true">
        <div
          className="flex flex-col items-center justify-center pt-6 pb-12 border-b border-gray-100"
          fr-fix-stroke="true"
        >
          <h1 className="text-2xl font-medium">朋友们</h1>
        </div>
      </section>
      <div className="p-4 justify-center space-x-4">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {data.map((item, index) => (
        <div key={index}>
              <GridItem>
                <Card maxW="auto">
                  <CardHeader>
                    <Flex>
                      <Flex flex="4" gap="4" alignItems="center" flexWrap="nowrap">
                        <Avatar name={item.name} src={item.avatar} />

                        <Box w="auto" h="auto">
                          <Heading size="sm">{item.name}</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text>{item.descr}</Text>
                  </CardBody>

                  <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                      '& > button': {
                        minW: '136px',
                      },
                    }}
                  >
                    <Link target="_blank" href={item.url}>
                      <Button
                        alignItems="center"
                        flex="1"
                        variant="ghost"
                        leftIcon={<ExternalLinkIcon />}
                      >
                        Go
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </GridItem>
          </div>
      ))}
          </Grid>
        </div>
      <center>
        <p>
          提交友链请查看<a href="https://github.com/hajeekn/Next.Blog">仓库 README.md</a>
        </p>
      </center>
    </div>
  );
}

export async function getStaticProps() {
  // read and parse the YML file
  const filePath = path.join(process.cwd(), 'data', 'friends.yaml');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = yaml.parse(fileContent);

  // return the data as props
  return {
    props: {
      data,
    },
  };
}
