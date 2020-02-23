import { getSports, getEvents, getOutcomes } from './data';
import axios from 'axios';

jest.mock('axios');

const data = {
  data: {
    sports: [
      {
        id: 1,
        desc: 'sport1',
      },
      {
        id: 2,
        desc: 'sport2'
      }
    ]
  }
};

const comp = [{
  events: [
    {
      id: 3,
      desc: 'event3'
    },
    {
      id: 4,
      desc: 'event4'
    },
  ]
}, {
  events: [
    {
      id: 5,
      desc: 'event5'
    },
    {
      id: 6,
      desc: 'event6'
    },
  ]
}]

const markets1 = [
  {
    id: 7,
    desc: 'market7',
    o: [
      {
        d: 'd8',
        prd: 8,
        pr: '8',
        po: 2
      },
      {
        d: 'd9',
        prd: 9,
        pr: '9',
        po: 1
      }
    ]
  },
  {
    id: 10,
    desc: 'market10',
    o: [
      {
        d: 'd11',
        prd: 11,
        pr: '11',
        po: 1
      },
      {
        d: 'd12',
        prd: 12,
        pr: '12',
        po: 2
      }
    ]
  }
]

const markets2 = [
  {
    id: 13,
    desc: 'market13',
    o: [
      {
        d: 'd14',
        prd: 14,
        pr: '14',
        po: 2
      },
      {
        d: 'd15',
        prd: 15,
        pr: '15',
        po: 1
      }
    ]
  },
  {
    id: 16,
    desc: 'market16',
    o: [
      {
        d: 'd17',
        prd: 17,
        pr: '17',
        po: 1
      },
      {
        d: 'd18',
        prd: 18,
        pr: '18',
        po: 2
      }
    ]
  }
]

fdescribe('getSports', () => {
  it('should get expected data format', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const expectedData = [{ "desc": "sport1", "id": 1 }, { "desc": "sport2", "id": 2 }]

    await expect(getSports()).resolves.toEqual(expectedData);

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:4567/data',
    );
  });
});

fdescribe('getEvents', () => {
  it('should get expected data format', async () => {
    data.data.sports[0].comp = comp;

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const expectedData = {
      "events": [
        { "desc": "event3", "id": 3 },
        { "desc": "event4", "id": 4 },
        { "desc": "event5", "id": 5 },
        { "desc": "event6", "id": 6 }],
      "sportDesc": "sport1"
    }

    await expect(getEvents('1')).resolves.toEqual(expectedData);

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:4567/data',
    );
  });
});

fdescribe('getOutcomes', () => {
  it('should get expected data format', async () => {
    data.data.sports[0].comp = comp;

    data.data.sports[0].comp[0].events[0].markets = markets1;
    data.data.sports[0].comp[0].events[1].markets = markets2;

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const expectedData = {
      outcomes: [
        {
          marketDesc: 'market7',
          o: [
            {
              d: 'd8',
              prd: 8,
              pr: '8',
              po: 2
            },
            {
              d: 'd9',
              prd: 9,
              pr: '9',
              po: 1
            }
          ]
        },
        {
          marketDesc: 'market10',
          o: [
            {
              d: 'd11',
              prd: 11,
              pr: '11',
              po: 1
            },
            {
              d: 'd12',
              prd: 12,
              pr: '12',
              po: 2
            }
          ]
        }
      ],
      eventDesc: 'event3'
    }

    await expect(getOutcomes('1', '3')).resolves.toEqual(expectedData);

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:4567/data',
    );
  });
});